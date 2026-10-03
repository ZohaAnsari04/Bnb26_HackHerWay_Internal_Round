import { PrismaClient } from '@prisma/client';
import {
  INITIAL_PROJECTS,
  INITIAL_ASSETS,
  INITIAL_OPPORTUNITIES,
  INITIAL_CLIPS,
  INITIAL_CALENDAR_EVENTS
} from '../src/lib/mockData';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding SQLite database with CreatorAI dataset...');

  // Clear existing records
  await prisma.calendarEvent.deleteMany();
  await prisma.generatedClip.deleteMany();
  await prisma.contentOpportunity.deleteMany();
  await prisma.asset.deleteMany();
  await prisma.project.deleteMany();

  // 1. Seed Projects
  for (const p of INITIAL_PROJECTS) {
    await prisma.project.create({
      data: {
        id: p.id,
        title: p.title,
        description: p.description,
        assetType: p.assetType,
        status: p.status,
        duration: p.durationSeconds,
        createdAt: new Date(p.createdAt),
      }
    });
  }

  // 2. Seed Assets
  for (const a of INITIAL_ASSETS) {
    await prisma.asset.create({
      data: {
        id: a.id,
        projectId: a.projectId,
        name: a.name,
        type: a.type,
        sizeBytes: a.sizeBytes,
        durationSeconds: a.durationSeconds,
        durationFormatted: a.durationFormatted,
        thumbnailUrl: a.thumbnailUrl,
        fileUrl: a.fileUrl,
        status: a.status,
        topics: JSON.stringify(a.topics || []),
        createdAt: new Date(a.createdAt),
      }
    });
  }

  // 3. Seed Content Opportunities
  for (const opp of INITIAL_OPPORTUNITIES) {
    await prisma.contentOpportunity.create({
      data: {
        id: opp.id,
        projectId: opp.projectId,
        title: opp.title,
        hookText: opp.hookText,
        startTime: opp.startTime,
        endTime: opp.endTime,
        startFormatted: opp.startFormatted,
        endFormatted: opp.endFormatted,
        duration: opp.duration,
        score: opp.score,
        factorsJson: JSON.stringify(opp.factors || {}),
        whyItWorksJson: JSON.stringify(opp.whyItWorks || []),
        suggestedPlatforms: JSON.stringify(opp.suggestedPlatforms || []),
        isGenerated: opp.isGenerated || false,
      }
    });
  }

  // 4. Seed Generated Clips
  for (const c of INITIAL_CLIPS) {
    await prisma.generatedClip.create({
      data: {
        id: c.id,
        projectId: c.projectId,
        opportunityId: c.opportunityId,
        title: c.title,
        hookText: c.hookText,
        duration: c.duration,
        durationFormatted: c.durationFormatted,
        aspectRatio: c.aspectRatio,
        platform: c.platform,
        score: c.score,
        thumbnailUrl: c.thumbnailUrl,
        videoUrl: c.videoUrl,
        status: c.status,
        captionStyleJson: JSON.stringify(c.captionStyle || {}),
        createdAt: new Date(c.createdAt),
      }
    });
  }

  // 5. Seed Calendar Events
  for (const ev of INITIAL_CALENDAR_EVENTS) {
    await prisma.calendarEvent.create({
      data: {
        id: ev.id,
        clipId: ev.clipId,
        title: ev.title,
        platform: ev.platform,
        scheduledTime: new Date(ev.scheduledTime),
        status: ev.status,
        copyText: ev.copyText,
        hashtags: JSON.stringify(ev.hashtags || []),
      }
    });
  }

  console.log('Seeding complete! Database ready.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
