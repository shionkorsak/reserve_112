import { NextResponse} from "next/server";
import { connectDB } from "../../../../lib/mongodb";
import booking from "@/app/models/booking";

export async function GET() {
    await connectDB();

    const today = new Date();
    const day1 = new Date(today.getFullYear(), today.getMonth(), 1);
    const bookings = await booking.find({date: {$gte:day1}})
    .sort({date:1})
    .lean()

    return NextResponse.json(bookings);
}