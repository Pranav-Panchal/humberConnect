// src/app/api/events/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Events route works!" });
}
