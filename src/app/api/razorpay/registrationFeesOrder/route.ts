import Razorpay from "razorpay";
import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export interface MyTokenPayload extends jwt.JwtPayload {
  isFromCse: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("logtok")?.value;
    if (!token) {
      const response = NextResponse.json(
        { error: "Login token missing" },
        { status: 401 }
      );
      return response;
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as MyTokenPayload;
    const response = NextResponse.json({ data: decoded }, { status: 200 });
    let amount = 1;
    if (!response) {
      const response = NextResponse.json(
        { error: "Login token missing, Please login" },
        { status: 401 }
      );
      return response;
    } else {
      console.log("payyy", decoded);
      
      //change the code here to change amount based on branch ar something
      const isFromCse =  /^[0-9]{4}ugcs[0-9]{3}@nitjsr\.ac\.in$/i.test(decoded.email);
      if (isFromCse) amount = 2;
    }

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_API_KEY!,
      key_secret: process.env.RAZORPAY_API_SECRET!,
    });
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt_order_" + Math.floor(Math.random() * 1000000),
    };
    const order = await instance.orders.create(options);
    return NextResponse.json({ success: true, order });
  } catch (error: any) {
    console.error("Razorpay Order Creation Error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
