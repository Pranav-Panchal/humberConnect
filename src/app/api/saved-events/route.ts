// src/app/api/saved-events/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import SavedEvent from '@/models/SavedEvent';

export async function POST(req: Request) {
  await dbConnect();

  try {
    const { userId, eventId, status } = await req.json();

    if (!userId || !eventId || !status) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const savedEvent = await SavedEvent.findOneAndUpdate(
      { userId, eventId },
      { userId, eventId, status },
      { new: true, upsert: true }
    );

    return NextResponse.json({ success: true, savedEvent }, { status: 200 });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Unknown error';
    console.error('Error saving event:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to save the event', error: message },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'User ID is required' },
        { status: 400 }
      );
    }

    const savedEvents = await SavedEvent.find({ userId });
    return NextResponse.json({ success: true, savedEvents }, { status: 200 });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Unknown error';
    console.error('Error retrieving events:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve events', error: message },
      { status: 500 }
    );
  }
}
