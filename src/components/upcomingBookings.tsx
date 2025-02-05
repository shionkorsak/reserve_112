"use client";

import { time } from "console";
import { useEffect, useState } from "react";

interface Booking {
  id: string;
  name: string;
  date: string;
  time: string[] | string;
  amount: number;
}

export default function UpcomingBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    async function fetchBookings() {
      const res = await fetch("/api/bookings");
      const data = await res.json();
      console.log("Fetched Bookings:", data);
      setBookings(data);
    }
    fetchBookings();
  }, []);

  const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  const formatearTime = (timeArray: string[]) => {
    if (timeArray.length > 0){
      const firstTime = timeArray[0];
      const lastTime = timeArray[timeArray.length - 1];

      return `${firstTime} to ${lastTime}`;
    }
    return "";
  }

  return (
    <section>
      <h1>Upcoming Bookings</h1>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id}>
            {booking.name} - {formatDate(booking.date)} - {formatearTime(Array.isArray(booking.time) ? booking.time : [booking.time])} -
            {booking.amount} people
          </li>
        ))}
      </ul>
    </section>
  );
}
