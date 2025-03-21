// File: app/api/event/[eventName]/route.ts
import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";
import Event from "@/models/eventModel";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const url = request.nextUrl; 
    const segments = url.pathname.split("/");
    const lastSegment = segments[segments.length - 1];
    const eventName = decodeURIComponent(lastSegment);
    const event = await Event.findOne({ name: eventName });
    if (!event) {
      return NextResponse.json(
        { success: false, message: "Event not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: true, event },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching event:", error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}
