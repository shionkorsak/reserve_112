import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../../lib/mongodb";
import Booking from "@/app/models/booking";

export async function POST(request: NextRequest) {
  const { name, email, date, time, id, amount } = await request.json();
  await connectDB();

  try {
    const requestedTimes = Array.isArray(time) ? time.sort() : [time];
    const existingBooking = await Booking.findOne({ date, time: { $in: requestedTimes } });
    if (existingBooking) {
      return NextResponse.json(
        { message: "Time clashes with existing reservation. Please re-check!" },
        { status: 400 }
      );
    }

    const newBooking = new Booking({ name, email, date, time: requestedTimes, id, amount });
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
