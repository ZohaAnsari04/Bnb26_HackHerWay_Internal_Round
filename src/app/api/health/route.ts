import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    platform: 'CreatorAI Next.js Engine',
    timestamp: new Date().toISOString()
  });
}
