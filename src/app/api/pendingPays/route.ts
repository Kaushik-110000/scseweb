import { connectDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import PendingPayments from "../../../models/pendingPaymentModel";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email } = await req.json();

    const data = await PendingPayments.find({ email: email, isPending: true });

    if (data.length > 0) {
      console.log(data);
      return NextResponse.json(
        { message: "Your payment verification is pending ", status: true },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Your not paid", status: false },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Error while getting the list of events" },
      { status: 500 }
    );
  }
}
