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
      console.log("fetched bookings:", data);
      setBookings(data);
      const today = new Date();
      const yesterday = new Date();
      yesterday.setDate(today.getDate()-1);
      const formateador = (date: Date) => date.toISOString().split("T")[0];
      const filterBook = data.filter((booking:Booking) => {
        const bookingDate = formateador(new Date(booking.date));
        return bookingDate >= formateador(yesterday);
      })
      setBookings(filterBook);
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
