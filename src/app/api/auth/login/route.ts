import { connectDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/userModel";
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email, password } = await req.json();
    const user = await User.findOne({ email: email });
    if (!user) {
      return NextResponse.json(
        { error: "Email id does not exists", status: 400 },
        { status: 400 }
      );
    }

    if (user.password != password) {
      return NextResponse.json(
        { error: "Wrong password entered", status: 400 },
        { status: 400 }
      );
    }

    const logtokPayload = {
      userID: user.userID,
      email: user.email,
      fullName: user.fullName,
    };

    const logtok = await jwt.sign(logtokPayload, process.env.JWT_SECRET!, {
      expiresIn: "60d",
    });

    const response = NextResponse.json(
      {
        message: "User logged in successfully",
        status: 200,
      },
      { status: 200 }
    );

    response.cookies.set("logtok", logtok, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 24 * 60 * 60, // 60 days in seconds
    });

    return response;
  } catch (error) {
    console.error("Error in user Login:", error);
    return NextResponse.json(
      { error: "Internal Server Error", status: 500 },
      { status: 500 }
    );
  }
}
