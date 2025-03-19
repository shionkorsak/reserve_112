import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../../lib/mongodb";
import Booking from "@/app/models/booking";
import { startOfWeek, endOfWeek } from "date-fns";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");
  const id = searchParams.get("id");

  if (!date || !id) {
    return NextResponse.json({ message: "Missing required parameters." }, { status: 400 });
  }

  await connectDB();

  try {
    const totalBookings = await Booking.countDocuments({ date });

    const userDailyBookings = await Booking.countDocuments({ date, id });

    const weekStart = startOfWeek(new Date(date), { weekStartsOn: 1 });
    const weekEnd = endOfWeek(new Date(date), { weekStartsOn: 1 });

    const userWeeklyBookings = await Booking.countDocuments({
      id,
      date: { $gte: weekStart.toISOString().split("T")[0], $lte: weekEnd.toISOString().split("T")[0] },
    });

    return NextResponse.json({ totalBookings, userDailyBookings, userWeeklyBookings });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error checking bookings." }, { status: 500 });
  }
}
