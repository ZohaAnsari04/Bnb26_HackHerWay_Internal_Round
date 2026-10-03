// @ts-ignore - native in Node 22+
import { DatabaseSync } from 'node:sqlite';
import path from 'path';
import fs from 'fs';
import {
  INITIAL_PROJECTS,
  INITIAL_ASSETS,
  INITIAL_OPPORTUNITIES,
  INITIAL_CLIPS,
  INITIAL_CALENDAR_EVENTS,
} from './mockData';

const dbPath = path.resolve(process.cwd(), 'dev.db');

class SQLiteDatabaseClient {
  private db: any;

  constructor() {
    this.db = new DatabaseSync(dbPath);
    this.initTables();
    this.seedIfEmpty();
  }

  private initTables() {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS projects (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        assetType TEXT DEFAULT 'video',
        status TEXT DEFAULT 'draft',
        duration INTEGER,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS assets (
        id TEXT PRIMARY KEY,
        projectId TEXT,
        name TEXT NOT NULL,
        type TEXT DEFAULT 'video',
        sizeBytes INTEGER DEFAULT 0,
        durationSeconds INTEGER,
        durationFormatted TEXT,
        thumbnailUrl TEXT,
        fileUrl TEXT DEFAULT '',
        status TEXT DEFAULT 'analyzed',
        topics TEXT DEFAULT '[]',
        createdAt TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS opportunities (
        id TEXT PRIMARY KEY,
        projectId TEXT NOT NULL,
        title TEXT NOT NULL,
        hookText TEXT NOT NULL,
        startTime REAL NOT NULL,
        endTime REAL NOT NULL,
        startFormatted TEXT NOT NULL,
        endFormatted TEXT NOT NULL,
        duration REAL NOT NULL,
        score INTEGER DEFAULT 85,
        factorsJson TEXT DEFAULT '{}',
        whyItWorksJson TEXT DEFAULT '[]',
        suggestedPlatforms TEXT DEFAULT '[]',
        isGenerated INTEGER DEFAULT 0,
        createdAt TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS clips (
        id TEXT PRIMARY KEY,
        projectId TEXT NOT NULL,
        opportunityId TEXT,
        title TEXT NOT NULL,
        hookText TEXT NOT NULL,
        duration REAL NOT NULL,
        durationFormatted TEXT NOT NULL,
        aspectRatio TEXT DEFAULT '9:16',
        platform TEXT DEFAULT 'tiktok',
        score INTEGER DEFAULT 90,
        thumbnailUrl TEXT NOT NULL,
        videoUrl TEXT NOT NULL,
        status TEXT DEFAULT 'ready',
        captionStyleJson TEXT DEFAULT '{}',
        createdAt TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS calendar_events (
        id TEXT PRIMARY KEY,
        clipId TEXT,
        title TEXT NOT NULL,
        platform TEXT NOT NULL,
        scheduledTime TEXT NOT NULL,
        status TEXT DEFAULT 'scheduled',
        copyText TEXT,
        hashtags TEXT DEFAULT '[]',
        createdAt TEXT NOT NULL
      );
    `);
  }

  private seedIfEmpty() {
    const row = this.db.prepare('SELECT count(*) as count FROM projects').get() as { count: number };
    if (row && row.count > 0) return;

    // Insert Projects
    const insertProj = this.db.prepare(`
      INSERT INTO projects (id, title, description, assetType, status, duration, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    for (const p of INITIAL_PROJECTS) {
      insertProj.run(
        p.id,
        p.title,
        p.description || '',
        p.assetType,
        p.status,
        p.durationSeconds || 600,
        p.createdAt,
        new Date().toISOString()
      );
    }

    // Insert Assets
    const insertAsset = this.db.prepare(`
      INSERT INTO assets (id, projectId, name, type, sizeBytes, durationSeconds, durationFormatted, thumbnailUrl, fileUrl, status, topics, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    for (const a of INITIAL_ASSETS) {
      insertAsset.run(
        a.id,
        a.projectId || null,
        a.name,
        a.type,
        a.sizeBytes,
        a.durationSeconds || null,
        a.durationFormatted || null,
        a.thumbnailUrl || null,
        a.fileUrl || '',
        a.status,
        JSON.stringify(a.topics || []),
        a.createdAt
      );
    }

    // Insert Opportunities
    const insertOpp = this.db.prepare(`
      INSERT INTO opportunities (id, projectId, title, hookText, startTime, endTime, startFormatted, endFormatted, duration, score, factorsJson, whyItWorksJson, suggestedPlatforms, isGenerated, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    for (const opp of INITIAL_OPPORTUNITIES) {
      insertOpp.run(
        opp.id,
        opp.projectId,
        opp.title,
        opp.hookText,
        opp.startTime,
        opp.endTime,
        opp.startFormatted,
        opp.endFormatted,
        opp.duration,
        opp.score,
        JSON.stringify(opp.factors || {}),
        JSON.stringify(opp.whyItWorks || []),
        JSON.stringify(opp.suggestedPlatforms || []),
        opp.isGenerated ? 1 : 0,
        new Date().toISOString()
      );
    }

    // Insert Clips
    const insertClip = this.db.prepare(`
      INSERT INTO clips (id, projectId, opportunityId, title, hookText, duration, durationFormatted, aspectRatio, platform, score, thumbnailUrl, videoUrl, status, captionStyleJson, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    for (const c of INITIAL_CLIPS) {
      insertClip.run(
        c.id,
        c.projectId,
        c.opportunityId || null,
        c.title,
        c.hookText,
        c.duration,
        c.durationFormatted,
        c.aspectRatio,
        c.platform,
        c.score,
        c.thumbnailUrl,
        c.videoUrl,
        c.status,
        JSON.stringify(c.captionStyle || {}),
        c.createdAt
      );
    }

    // Insert Calendar Events
    const insertEvent = this.db.prepare(`
      INSERT INTO calendar_events (id, clipId, title, platform, scheduledTime, status, copyText, hashtags, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    for (const ev of INITIAL_CALENDAR_EVENTS) {
      insertEvent.run(
        ev.id,
        ev.clipId || null,
        ev.title,
        ev.platform,
        ev.scheduledTime,
        ev.status,
        ev.copyText || '',
        JSON.stringify(ev.hashtags || []),
        new Date().toISOString()
      );
    }
  }

  // --- Project Repository ---
  project = {
    findMany: async (args?: any) => {
      const rows = this.db.prepare('SELECT * FROM projects ORDER BY createdAt DESC').all() as any[];
      return rows.map((r) => {
        const oppCount = (this.db.prepare('SELECT count(*) as c FROM opportunities WHERE projectId = ?').get(r.id) as any)?.c || 0;
        const clipCount = (this.db.prepare('SELECT count(*) as c FROM clips WHERE projectId = ?').get(r.id) as any)?.c || 0;
        const assetCount = (this.db.prepare('SELECT count(*) as c FROM assets WHERE projectId = ?').get(r.id) as any)?.c || 0;
        const assets = this.db.prepare('SELECT * FROM assets WHERE projectId = ?').all(r.id) as any[];

        return {
          ...r,
          _count: {
            opportunities: oppCount,
            clips: clipCount,
            assets: assetCount,
          },
          assets,
        };
      });
    },

    findUnique: async ({ where }: { where: { id: string } }) => {
      const proj = this.db.prepare('SELECT * FROM projects WHERE id = ?').get(where.id) as any;
      if (!proj) return null;

      const assets = this.db.prepare('SELECT * FROM assets WHERE projectId = ?').all(proj.id);
      const opportunities = this.db.prepare('SELECT * FROM opportunities WHERE projectId = ?').all(proj.id);
      const clips = this.db.prepare('SELECT * FROM clips WHERE projectId = ?').all(proj.id);

      return {
        ...proj,
        assets,
        opportunities,
        clips,
      };
    },

    create: async ({ data }: { data: any }) => {
      const id = data.id || `proj-${Date.now()}`;
      const now = new Date().toISOString();
      this.db
        .prepare(`
          INSERT INTO projects (id, title, description, assetType, status, duration, createdAt, updatedAt)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `)
        .run(
          id,
          data.title,
          data.description || '',
          data.assetType || 'video',
          data.status || 'draft',
          data.duration || 600,
          now,
          now
        );
      return this.project.findUnique({ where: { id } });
    },

    update: async ({ where, data }: { where: { id: string }; data: any }) => {
      const updates: string[] = [];
      const values: any[] = [];

      for (const [key, val] of Object.entries(data)) {
        if (val !== undefined) {
          updates.push(`${key} = ?`);
          values.push(val);
        }
      }
      updates.push('updatedAt = ?');
      values.push(new Date().toISOString());
      values.push(where.id);

      this.db.prepare(`UPDATE projects SET ${updates.join(', ')} WHERE id = ?`).run(...values);
      return this.project.findUnique({ where });
    },

    delete: async ({ where }: { where: { id: string } }) => {
      this.db.prepare('DELETE FROM projects WHERE id = ?').run(where.id);
      this.db.prepare('DELETE FROM opportunities WHERE projectId = ?').run(where.id);
      this.db.prepare('DELETE FROM clips WHERE projectId = ?').run(where.id);
      return { id: where.id };
    },
  };

  // --- Generated Clip Repository ---
  generatedClip = {
    findMany: async (args?: any) => {
      let query = 'SELECT * FROM clips';
      const params: any[] = [];

      if (args?.where?.projectId) {
        query += ' WHERE projectId = ?';
        params.push(args.where.projectId);
      }
      query += ' ORDER BY createdAt DESC';

      const rows = this.db.prepare(query).all(...params) as any[];
      return rows.map((r) => {
        const proj = this.db.prepare('SELECT title FROM projects WHERE id = ?').get(r.projectId) as any;
        return {
          ...r,
          project: proj || { title: 'Untitled Project' },
          captionStyle: JSON.parse(r.captionStyleJson || '{}'),
        };
      });
    },

    create: async ({ data }: { data: any }) => {
      const id = data.id || `clip-${Date.now()}`;
      const now = new Date().toISOString();

      this.db
        .prepare(`
          INSERT INTO clips (id, projectId, opportunityId, title, hookText, duration, durationFormatted, aspectRatio, platform, score, thumbnailUrl, videoUrl, status, captionStyleJson, createdAt)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `)
        .run(
          id,
          data.projectId,
          data.opportunityId || null,
          data.title,
          data.hookText || '',
          data.duration || 30,
          data.durationFormatted || '00:30',
          data.aspectRatio || '9:16',
          data.platform || 'tiktok',
          data.score || 90,
          data.thumbnailUrl,
          data.videoUrl,
          data.status || 'ready',
          data.captionStyleJson || '{}',
          now
        );

      const created = this.db.prepare('SELECT * FROM clips WHERE id = ?').get(id) as any;
      return {
        ...created,
        captionStyle: JSON.parse(created.captionStyleJson || '{}'),
      };
    },
  };

  // --- Calendar Event Repository ---
  calendarEvent = {
    findMany: async (args?: any) => {
      const rows = this.db.prepare('SELECT * FROM calendar_events ORDER BY scheduledTime ASC').all() as any[];
      return rows.map((r) => {
        const clip = r.clipId
          ? (this.db.prepare('SELECT title, thumbnailUrl, aspectRatio FROM clips WHERE id = ?').get(r.clipId) as any)
          : null;
        return {
          ...r,
          clip,
          hashtags: JSON.parse(r.hashtags || '[]'),
        };
      });
    },

    create: async ({ data }: { data: any }) => {
      const id = data.id || `cal-${Date.now()}`;
      const now = new Date().toISOString();

      this.db
        .prepare(`
          INSERT INTO calendar_events (id, clipId, title, platform, scheduledTime, status, copyText, hashtags, createdAt)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `)
        .run(
          id,
          data.clipId || null,
          data.title,
          data.platform,
          typeof data.scheduledTime === 'string' ? data.scheduledTime : data.scheduledTime.toISOString(),
          data.status || 'scheduled',
          data.copyText || '',
          data.hashtags || '[]',
          now
        );

      const created = this.db.prepare('SELECT * FROM calendar_events WHERE id = ?').get(id) as any;
      return {
        ...created,
        hashtags: JSON.parse(created.hashtags || '[]'),
      };
    },
  };

  // --- Content Opportunity Repository ---
  contentOpportunity = {
    findMany: async (args?: any) => {
      let query = 'SELECT * FROM opportunities';
      const params: any[] = [];
      if (args?.where?.projectId) {
        query += ' WHERE projectId = ?';
        params.push(args.where.projectId);
      }
      const rows = this.db.prepare(query).all(...params) as any[];
      return rows.map((r) => ({
        ...r,
        factors: JSON.parse(r.factorsJson || '{}'),
        whyItWorks: JSON.parse(r.whyItWorksJson || '[]'),
        suggestedPlatforms: JSON.parse(r.suggestedPlatforms || '[]'),
      }));
    },
  };
}

const globalForDb = globalThis as unknown as {
  prisma: SQLiteDatabaseClient | undefined;
};

export const prisma = globalForDb.prisma ?? new SQLiteDatabaseClient();

if (process.env.NODE_ENV !== 'production') globalForDb.prisma = prisma;
