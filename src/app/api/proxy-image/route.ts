import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const imageUrl = searchParams.get("url");

  if (!imageUrl) {
    return NextResponse.json({ error: "No image URL provided" }, { status: 400 });
  }

  try {
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const contentType = response.headers["content-type"];

    return new NextResponse(response.data, {
      headers: { "Content-Type": contentType },
    });
  } catch (error) {
    console.error("❌ Error fetching Instagram image:", error);
    return NextResponse.json({ error: "Failed to load image" }, { status: 500 });
  }
}
