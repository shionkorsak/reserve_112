import { NextResponse} from "next/server";
import { connectDB } from "../../../../lib/mongodb";
import booking from "@/app/models/booking";

export async function GET() {
    await connectDB();

    const bookings = await booking.find({date: {$gte:new Date ()}})
    .sort({date:1})
    .lean()

    return NextResponse.json(bookings);
}