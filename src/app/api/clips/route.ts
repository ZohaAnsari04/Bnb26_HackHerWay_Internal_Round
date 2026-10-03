import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');

    const clips = await prisma.generatedClip.findMany({
      where: projectId ? { projectId } : undefined,
      include: {
        project: {
          select: {
            title: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({
      success: true,
      clips,
    });
  } catch (error) {
    console.error('Failed to fetch clips:', error);
    return NextResponse.json(
      { success: false, error: 'Database query failed' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      projectId,
      opportunityId,
      title,
      hookText,
      duration,
      durationFormatted,
      aspectRatio = '9:16',
      platform = 'tiktok',
      score = 90,
      thumbnailUrl,
      videoUrl,
      captionStyle = {},
    } = body;

    if (!projectId || !title) {
      return NextResponse.json(
        { success: false, error: 'projectId and title are required' },
        { status: 400 }
      );
    }

    const clip = await prisma.generatedClip.create({
      data: {
        projectId,
        opportunityId: opportunityId || null,
        title,
        hookText: hookText || '',
        duration: duration || 30,
        durationFormatted: durationFormatted || '00:30',
        aspectRatio,
        platform,
        score,
        thumbnailUrl: thumbnailUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
        videoUrl: videoUrl || 'https://assets.mixkit.co/videos/preview/mixkit-speaker-at-a-business-conference-41551-large.mp4',
        status: 'ready',
        captionStyleJson: JSON.stringify(captionStyle),
      },
    });

    return NextResponse.json({
      success: true,
      clip,
    });
  } catch (error) {
    console.error('Failed to create clip:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create clip' },
      { status: 500 }
    );
  }
}
