import { google } from "googleapis";
import { connectDB } from "@/dbConfig/dbConfig";
import Eauth from "@/models/eAuthModel";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/userModel";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    // Extract the "code" from the query params
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");
    if (!code) {
      return NextResponse.json({ error: "No code provided" }, { status: 400 });
    }

    // Create OAuth2 client
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    // Exchange code for tokens
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const { data } = await axios.get(
      `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${tokens.access_token}`
    );
    const { email } = data;
    console.log("email is ", email);

    if (!email) {
      return NextResponse.json(
        { error: "No email returned from Google" },
        { status: 400 }
      );
    }

    //same as login start
    const user = await User.findOne({ email: email });
    if (user) {
      const logtokPayload = {
        userID: user.userID,
        email: user.email,
        fullName: user.fullName,
      };
      const logtok = await jwt.sign(logtokPayload, process.env.JWT_SECRET!, {
        expiresIn: "60d",
      });
      const response = NextResponse.json(
        { error: "User already exists, logging in", status: 405 },
        { status: 405 }
      );
      response.cookies.set("logtok", logtok, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 24 * 60 * 60, // 60 days in seconds
      });
      return response;
    }
    //same as login ends

    //now creating the instance for the proper authentication
    let instance = await Eauth.findOne({ email });
    if (!instance) {
      instance = new Eauth({ email, token: tokens.access_token });
      await instance.save();
    } else {
      instance.token = tokens.access_token || "xyz";
      await instance.save();
    }

    const payload = { email, token: instance.token };
    const secret = process.env.JWT_SECRET || "def";
    const jwtToken = jwt.sign(payload, secret, { expiresIn: "2d" });

    const response = NextResponse.json(
      { email, message: "Proceed to set up credentials" },
      { status: 200 }
    );

    response.cookies.set("eAuthToken", jwtToken, {
      httpOnly: true,
      // secure: true,
      path: "/",
      maxAge: 60 * 60 * 2 * 24, // 2 days in seconds
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
