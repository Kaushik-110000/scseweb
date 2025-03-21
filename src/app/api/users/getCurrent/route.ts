import { connectDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/userModel";
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const token = req.cookies.get("logtok")?.value;
    if (!token) {
      const response = NextResponse.json(
        {
          message: "Login token missing, No user ",
          data: { fullName: "Please login" },
          status: 210,
        },
        { status: 210 }
      );
      return response;
    }
    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
      console.log("decoded");
      const user = await User.findOne({ email: decoded.email }).select(
        "-password"
      );
      const response = NextResponse.json(
        { data: { ...user, status: 200 }, status: 200 },
        { status: 200 }
      );
      return response;
    } catch (error) {
      const response = NextResponse.json(
        { error: "Login token error", status: 401 },
        { status: 401 }
      );
      response.cookies.delete("logtok");
      return response;
    }
  } catch (error) {
    const response = NextResponse.json(
      { error: "Error while getting the current user" },
      { status: 401 }
    );
    return response;
  }
}
