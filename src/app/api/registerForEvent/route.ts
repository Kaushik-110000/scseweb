import { connectDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import EventRegistration from "@/models/eventRegistrationModel";

// Example route: POST /api/event/register
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { teamName, members, eventName } = await req.json();

    // 1) Check for missing fields
    if (!teamName || !Array.isArray(members) || !eventName) {
      return NextResponse.json(
        { error: "Missing required fields: teamName, members, or eventName" },
        { status: 400 }
      );
    }

    // logic for unique
    const uniqueMembers = new Set(members);
    if (uniqueMembers.size !== members.length) {
      return NextResponse.json(
        { error: "Duplicate entries in members array" },
        { status: 400 }
      );
    }

    // 2) For each member, ensure user exists
    let allPrime = true; // We'll assume all are prime until proven otherwise
    for (const memberId of members) {
      const user = await User.findOne({ userID: memberId });
      if (!user) {
        return NextResponse.json(
          { error: `Member not found in DB: ${memberId}` },
          { status: 404 }
        );
      }



      // 3) Check if user is prime
      if (!user.isPrime) {
        allPrime = false;
      }
    }

    // 4) If not all prime, return 420
    if (!allPrime) {
      return NextResponse.json(
        { error: "All members are not Prime , pay for registration" },
        { status: 420 }
      );
    }

    const newRegistration = new EventRegistration({
      teamName,
      eventName,
      members,
      isAllPrime: true,
      razorpay_order_id: "no_need",
      razorpay_payment_id: "no_need",
      razorpay_signature: "no_need",
    });

    await newRegistration.save();

    return NextResponse.json(
      { success: true, message: "Registration created successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Event Registration Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
