import { connectDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Visitor from "@/models/visitorModel";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    let visitor = await Visitor.findOne();
    
    if (!visitor) {
      visitor = new Visitor({ count: 1 });
    } else {
      visitor.count += 1;
    }

    await visitor.save();
    return NextResponse.json({ count: visitor.count });
  } catch (error) {
    return NextResponse.json({ error: "Error updating visitor count" }, { status: 500 });
  }
}
