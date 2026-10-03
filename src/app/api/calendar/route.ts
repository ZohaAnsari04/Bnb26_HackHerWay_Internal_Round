import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const events = await prisma.calendarEvent.findMany({
      include: {
        clip: {
          select: {
            title: true,
            thumbnailUrl: true,
            aspectRatio: true,
          },
        },
      },
      orderBy: {
        scheduledTime: 'asc',
      },
    });

    return NextResponse.json({
      success: true,
      events,
    });
  } catch (error) {
    console.error('Failed to fetch calendar events:', error);
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
      clipId,
      title,
      platform,
      scheduledTime,
      copyText,
      hashtags = [],
    } = body;

    if (!title || !platform || !scheduledTime) {
      return NextResponse.json(
        { success: false, error: 'title, platform, and scheduledTime are required' },
        { status: 400 }
      );
    }

    const event = await prisma.calendarEvent.create({
      data: {
        clipId: clipId || null,
        title,
        platform,
        scheduledTime: new Date(scheduledTime),
        copyText: copyText || '',
        hashtags: JSON.stringify(hashtags),
        status: 'scheduled',
      },
    });

    return NextResponse.json({
      success: true,
      event,
    });
  } catch (error) {
    console.error('Failed to create calendar event:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create calendar event' },
      { status: 500 }
    );
  }
}
