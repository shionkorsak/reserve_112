"use client";

import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface Booking {
  id: string;
  date: string;
}

export default function BookingCalendar() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    async function fetchBookings() {
      const res = await fetch("/api/bookings");
      const data = await res.json();
      setBookings(data);
    }
    fetchBookings();
  }, []);

  const bookedDates = bookings.map((b) => new Date(b.date));

  return (
    <section>
      <Calendar
        tileClassName={({ date }) =>
          bookedDates.some((d) => d.toDateString() === date.toDateString())
            ? "booked"
            : ""
        }
      />
    </section>
  );
}
