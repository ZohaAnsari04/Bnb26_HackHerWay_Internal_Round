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
        duration TEXT DEFAULT '10:42',
        durationSeconds INTEGER DEFAULT 642,
        thumbnailUrl TEXT DEFAULT '',
        opportunityPotential INTEGER DEFAULT 84,
        topics TEXT DEFAULT '[]',
        tone TEXT DEFAULT 'Educational & Authoritative',
        targetAudience TEXT DEFAULT 'Software Developers',
        keyThemes TEXT DEFAULT '[]',
        analysisComplete INTEGER DEFAULT 1,
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

    // Run graceful schema migrations for existing dev.db
    const projectMigrations = [
      "ALTER TABLE projects ADD COLUMN durationSeconds INTEGER DEFAULT 642",
      "ALTER TABLE projects ADD COLUMN thumbnailUrl TEXT DEFAULT ''",
      "ALTER TABLE projects ADD COLUMN opportunityPotential INTEGER DEFAULT 84",
      "ALTER TABLE projects ADD COLUMN topics TEXT DEFAULT '[]'",
      "ALTER TABLE projects ADD COLUMN tone TEXT DEFAULT 'Educational & Authoritative'",
      "ALTER TABLE projects ADD COLUMN targetAudience TEXT DEFAULT 'Software Developers'",
      "ALTER TABLE projects ADD COLUMN keyThemes TEXT DEFAULT '[]'",
      "ALTER TABLE projects ADD COLUMN analysisComplete INTEGER DEFAULT 1",
    ];
    for (const sql of projectMigrations) {
      try {
        this.db.exec(sql);
      } catch (e) {}
    }
  }

  private seedIfEmpty() {
    const row = this.db.prepare('SELECT count(*) as count FROM projects').get() as { count: number };
    if (!row || row.count === 0) {
      // Insert Projects
      const insertProj = this.db.prepare(`
        INSERT INTO projects (
          id, title, description, assetType, status, duration, durationSeconds,
          thumbnailUrl, opportunityPotential, topics, tone, targetAudience, keyThemes,
          analysisComplete, createdAt, updatedAt
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      for (const p of INITIAL_PROJECTS) {
        insertProj.run(
          p.id,
          p.title,
          p.description || '',
          p.assetType,
          p.status,
          p.duration || '10:42',
          p.durationSeconds || 600,
          p.thumbnailUrl || '',
          p.opportunityPotential || 84,
          JSON.stringify(p.topics || []),
          p.tone || 'Educational & Authoritative',
          p.targetAudience || 'Software Developers',
          JSON.stringify(p.keyThemes || []),
          p.analysisComplete ? 1 : 0,
          p.createdAt,
          new Date().toISOString()
        );
      }
    } else {
      // Sync initial metadata if topics is empty
      try {
        const updateProj = this.db.prepare(`
          UPDATE projects SET
            topics = ?,
            tone = ?,
            targetAudience = ?,
            keyThemes = ?,
            opportunityPotential = ?,
            thumbnailUrl = ?,
            durationSeconds = ?
          WHERE id = ? AND (topics IS NULL OR topics = '[]' OR topics = '')
        `);
        for (const p of INITIAL_PROJECTS) {
          updateProj.run(
            JSON.stringify(p.topics || []),
            p.tone || 'Educational & Authoritative',
            p.targetAudience || 'Software Developers',
            JSON.stringify(p.keyThemes || []),
            p.opportunityPotential || 84,
            p.thumbnailUrl || '',
            p.durationSeconds || 642,
            p.id
          );
        }
      } catch (e) {}
    }

    // Insert Assets (idempotent)
    const insertAsset = this.db.prepare(`
      INSERT OR IGNORE INTO assets (id, projectId, name, type, sizeBytes, durationSeconds, durationFormatted, thumbnailUrl, fileUrl, status, topics, createdAt)
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

    // Insert Opportunities (idempotent)
    const insertOpp = this.db.prepare(`
      INSERT OR IGNORE INTO opportunities (id, projectId, title, hookText, startTime, endTime, startFormatted, endFormatted, duration, score, factorsJson, whyItWorksJson, suggestedPlatforms, isGenerated, createdAt)
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

    // Insert Clips (idempotent)
    const insertClip = this.db.prepare(`
      INSERT OR IGNORE INTO clips (id, projectId, opportunityId, title, hookText, duration, durationFormatted, aspectRatio, platform, score, thumbnailUrl, videoUrl, status, captionStyleJson, createdAt)
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

    // Insert Calendar Events (idempotent)
    const insertEvent = this.db.prepare(`
      INSERT OR IGNORE INTO calendar_events (id, clipId, title, platform, scheduledTime, status, copyText, hashtags, createdAt)
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
  private formatProjectRow(r: any) {
    if (!r) return null;
    let topics: string[] = ['Artificial Intelligence', 'Software Engineering', 'AI Agents'];
    let keyThemes: string[] = ['AI Operating Systems', 'Developer Productivity', 'Autonomous Agents'];
    try {
      if (r.topics) {
        const parsed = typeof r.topics === 'string' ? JSON.parse(r.topics) : r.topics;
        if (Array.isArray(parsed) && parsed.length > 0) topics = parsed;
      }
    } catch {}

    try {
      if (r.keyThemes) {
        const parsed = typeof r.keyThemes === 'string' ? JSON.parse(r.keyThemes) : r.keyThemes;
        if (Array.isArray(parsed) && parsed.length > 0) keyThemes = parsed;
      }
    } catch {}

    return {
      ...r,
      durationSeconds: r.durationSeconds || (typeof r.duration === 'number' ? r.duration : 642),
      duration: typeof r.duration === 'string' ? r.duration : '10:42',
      thumbnailUrl: r.thumbnailUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      status: r.status || 'ready',
      opportunityPotential: r.opportunityPotential || 84,
      topics,
      tone: r.tone || 'Educational & Authoritative',
      targetAudience: r.targetAudience || 'Software Developers',
      keyThemes,
      analysisComplete: Boolean(r.analysisComplete ?? true),
    };
  }

  project = {
    findMany: async (args?: any) => {
      const rows = this.db.prepare('SELECT * FROM projects ORDER BY createdAt DESC').all() as any[];
      return rows.map((r) => {
        const formatted = this.formatProjectRow(r);
        const oppCount = (this.db.prepare('SELECT count(*) as c FROM opportunities WHERE projectId = ?').get(r.id) as any)?.c || 0;
        const clipCount = (this.db.prepare('SELECT count(*) as c FROM clips WHERE projectId = ?').get(r.id) as any)?.c || 0;
        const assetCount = (this.db.prepare('SELECT count(*) as c FROM assets WHERE projectId = ?').get(r.id) as any)?.c || 0;
        const assets = this.db.prepare('SELECT * FROM assets WHERE projectId = ?').all(r.id) as any[];

        return {
          ...formatted,
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

      const formatted = this.formatProjectRow(proj);
      const assets = this.db.prepare('SELECT * FROM assets WHERE projectId = ?').all(proj.id);
      const opportunities = this.db.prepare('SELECT * FROM opportunities WHERE projectId = ?').all(proj.id);
      const clips = this.db.prepare('SELECT * FROM clips WHERE projectId = ?').all(proj.id);

      return {
        ...formatted,
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

        // Ensure scheduledDate and scheduledTime are properly formatted
        let scheduledDate = '2026-03-30';
        let scheduledTime = '18:00';

        if (r.scheduledTime) {
          if (r.scheduledTime.includes('T')) {
            const parts = r.scheduledTime.split('T');
            scheduledDate = parts[0];
            scheduledTime = parts[1].substring(0, 5);
          } else if (r.scheduledTime.includes(':')) {
            scheduledTime = r.scheduledTime;
          }
        }

        // Map initial mock event dates if not explicitly in DB
        if (r.id === 'cal-1') scheduledDate = '2026-03-30';
        else if (r.id === 'cal-2') scheduledDate = '2026-03-31';
        else if (r.id === 'cal-3') scheduledDate = '2026-04-01';
        else if (r.id === 'cal-4') scheduledDate = '2026-03-29';
        else if (r.id.includes('1791061281854')) scheduledDate = '2026-04-02';
        else if (r.id.includes('1791063454652')) scheduledDate = '2026-04-03';

        const defaultThumb = clip?.thumbnailUrl || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80';

        let parsedHashtags: string[] = ['#AI', '#Productivity', '#ContentOps'];
        try {
          if (r.hashtags) {
            const parsed = typeof r.hashtags === 'string' ? JSON.parse(r.hashtags) : r.hashtags;
            if (Array.isArray(parsed) && parsed.length > 0) parsedHashtags = parsed;
          }
        } catch {}

        return {
          ...r,
          scheduledDate,
          scheduledTime,
          thumbnailUrl: r.thumbnailUrl || defaultThumb,
          captionExcerpt: r.copyText || r.captionExcerpt || "High-retention AI short cut ready for syndication across modern social algorithms...",
          clip,
          hashtags: parsedHashtags,
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
