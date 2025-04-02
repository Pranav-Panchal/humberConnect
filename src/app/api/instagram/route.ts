import { NextResponse } from "next/server";
import axios from "axios";
import connectDB from "@/lib/dbConnect"; // Ensure your database connection is properly configured
import Event from "@/models/Event"; // Assuming you have the Event model


const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY!;
const RAPIDAPI_HOST = process.env.RAPIDAPI_HOST!;
const INSTAGRAM_USERNAME = process.env.INSTAGRAM_USERNAME!;

// Define an interface for Instagram items
interface InstagramItem {
  id?: string;
  pk?: string;
  image_versions2?: {
    candidates?: Array<{ url: string }>;
  };
  video_versions?: Array<{ url: string }>;
  caption?: { text?: string };
  media_type?: number;
  taken_at?: number;
}

export async function GET() {
  try {
    await connectDB();

    const response = await axios.get(`https://${RAPIDAPI_HOST}/v1/user_posts`, {
      params: { username_or_id: INSTAGRAM_USERNAME, count: "12" },
      headers: { "x-rapidapi-key": RAPIDAPI_KEY, "x-rapidapi-host": RAPIDAPI_HOST },
    });

    const items = response.data?.data?.items || [];


    // Modify the map function to use this type
    const events = await Promise.all(items.map(async (item: InstagramItem) => {
      const eventId = item.id || item.pk || Math.random().toString(36).slice(2);
      let existingEvent = await Event.findOne({ eventId });

      if (existingEvent) {
        existingEvent.image = item.image_versions2?.candidates?.[0]?.url || null;
        existingEvent.video = item.video_versions?.[0]?.url || null;
        existingEvent.postDate = item.taken_at ? new Date(item.taken_at * 1000).toISOString() : new Date().toISOString();
        await existingEvent.save();
      } else {
        existingEvent = new Event({
          eventId,
          image: item.image_versions2?.candidates?.[0]?.url || null,
          video: item.video_versions?.[0]?.url || null,
          caption: item.caption?.text || "No caption provided.",
          isVideo: item.media_type === 2,
          postDate: item.taken_at ? new Date(item.taken_at * 1000).toISOString() : new Date().toISOString()
        });
        await existingEvent.save();
      }
      return existingEvent;
    }));

    return NextResponse.json(events);
  } // Improved error handling
  catch (error: unknown) {
    if (error instanceof Error) {
      console.error("❌ Error fetching Instagram posts:", error.message);
      return NextResponse.json({
        error: "Failed to fetch Instagram posts",
        message: error.message
      }, { status: 500 });
    } else {
      console.error("❌ An unexpected error occurred");
      return NextResponse.json({
        error: "An unexpected error occurred",
        message: "An error occurred and it could not be parsed"
      }, { status: 500 });
    }
  }
  
}
