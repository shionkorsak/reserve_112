import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../../lib/mongodb";
import Booking from "@/app/models/booking";

export async function POST(request: NextRequest) {
  const { name, email, date, time, id, amount } = await request.json();
  await connectDB();

  try {
    const newBooking = new Booking({ name, email, date, time, id, amount });
    await newBooking.save();
    return NextResponse.json({ message: "Request submitted successfully!" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Booking failed" }, { status: 500 });
  }
}

export async function GET() {
  await connectDB();
  const bookings = await Booking.find();
  return NextResponse.json(bookings);
}
