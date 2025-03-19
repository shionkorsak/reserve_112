"use client";

import { useEffect, useState } from "react";
import styles from "@/app/page.module.css";
import { startOfWeek, isAfter, parseISO } from "date-fns";

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
      
      const today = new Date();
      const startOfCurrentWeek = startOfWeek(today, { weekStartsOn: 1 }); // Monday as start of the week

      const filteredBookings = data.filter((booking: Booking) =>
        isAfter(parseISO(booking.date), startOfCurrentWeek) || 
        booking.date === startOfCurrentWeek.toISOString().split("T")[0]
      );

      setBookings(filteredBookings);
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

  const formatTime = (timeArray: string[]) => {
    if (timeArray.length > 0) {
      return `${timeArray[0]} to ${timeArray[timeArray.length - 1]}`;
    }
    return "";
  };

  return (
      <ul className={styles.bookingf}>
        {bookings.map((booking) => (
          <li key={booking.id}>
            {booking.name} - {formatDate(booking.date)} <br/> 
            <code style={{color: "#6395ee"}}> 
              {formatTime(Array.isArray(booking.time) ? booking.time : [booking.time])}
            </code>
          </li>
        ))}
      </ul>
  );
}
