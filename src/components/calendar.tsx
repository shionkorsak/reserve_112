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
      
      //console.log("bookings fresh from api:", data);
      setBookings(data);
    }
    fetchBookings();
  }, []);

  const bookedDates = bookings.map((b) => {
    const dateObj = new Date(b.date);
    dateObj.setMinutes(dateObj.getMinutes() + dateObj.getTimezoneOffset());
    return dateObj;
  });

  return (
    <section>
      <Calendar
        tileClassName={({ date }) => {
          //console.log("rn im checking date:", date.toDateString());

          const isBooked = bookedDates.some(
            (d) =>
              d.getFullYear() === date.getFullYear() &&
              d.getMonth() === date.getMonth() &&
              d.getDate() === date.getDate()
          );
          

          //console.log(`the date: ${date.toDateString()}, is it booked: ${isBooked}`);
          return isBooked ? "booked" : "";
        }}
        value={new Date(new Date().getTime() + 8 * 60 * 60 * 1000)}
      />
    </section>
  );
}
