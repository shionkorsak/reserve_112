"use client";

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
      //console.log("fetched bookings:", data);
      setBookings(data);
    }
    fetchBookings();
  }, []);

  const formatDate = (date: string) => {
    const [year, month, day] = date.split("T")[0].split("-");
  
    const months: { [key: string]: string } = {
      "01": "Jan", "02": "Feb", "03": "Mar", "04": "Apr", "05": "May", "06": "Jun",
      "07": "Jul", "08": "Aug", "09": "Sep", "10": "Oct", "11": "Nov", "12": "Dec"
    }; // bro i did not use any js functions because it keeps messing up bc of the timezone, that shaved YEARS off my life
  
    return `${months[month]} ${day}, ${year}`;
  };

  const formatearTime = (timeArray: string[]) => {
    if (timeArray.length > 0){
      const firstTime = timeArray[0];
      const lastTime = timeArray[timeArray.length - 1];
      return `${firstTime} to ${lastTime}`;
    }
    return "";
  };

  return (
    <section>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id}>
            {booking.name} - {formatDate(booking.date)} - {formatearTime(Array.isArray(booking.time) ? booking.time : [booking.time])}
          </li>
        ))}
      </ul>
    </section>
  );}