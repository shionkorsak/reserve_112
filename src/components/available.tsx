"use client";

import { useEffect, useState } from "react";
//import styles from "@/app/page.module.css";

export default function RoomStatus() {
  const [isBooked, setIsBooked] = useState(false);

  useEffect(() => {
    async function fetchBookings() {
      const res = await fetch("/api/bookings");
      const data = await res.json();

      //console.log("bookings from api:", data);

      const now = new Date();
      const nowHours = now.getHours();
      const nowMinutes = now.getMinutes();
      const nowTime = nowHours * 60 + nowMinutes; 

      if (nowHours < 8 || nowHours >= 22) {
        setIsBooked(false);
        return;
      }

      const isRoomBooked = data.some((b: { date: string; time: string | string[] }) => {
        const dateObj = new Date(b.date);
        dateObj.setMinutes(dateObj.getMinutes() + dateObj.getTimezoneOffset()); 
        if (!Array.isArray(b.time)) b.time = [b.time]; 

        return b.time.some((t) => {
          const [startHours, startMinutes] = t.split(":").map(Number);
          const startTime = startHours * 60 + startMinutes; 
          const endTime = startTime + 30; 

          return dateObj.toDateString() === now.toDateString() && nowTime >= startTime && nowTime < endTime;
        });
      });

      //console.log("am i bookde rn?", isRoomBooked);

      setIsBooked(isRoomBooked);
    }

    fetchBookings();
    const interval = setInterval(fetchBookings, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2><code>
      Room Status:{" "}
      <span style={{color: isBooked ? "red" : "green"}}>
        {isBooked ? "Unavailable" : "Available"}
      </span>
      </code>
      </h2>
    </div>
  );
}
