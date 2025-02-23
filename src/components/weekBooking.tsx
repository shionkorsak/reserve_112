"use client";

import { useEffect, useState } from "react";
import {Calendar, momentLocalizer, Event} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import styles from "@/app/page.module.css";

const localizer = momentLocalizer(moment);

interface Booking {
  id: string;
  date: string;
  time: string[];
  name: string;
}

export default function WeeklySchedule() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkSize = () => {
      setIsMobile(window.innerWidth<=529)
    };
    checkSize();
    window.addEventListener("resize", checkSize);
  })

  useEffect(() => {
    async function fetchBookings() {
      const res = await fetch("/api/bookings");
      const data: Booking[] = await res.json();

      const formattedEvents = data.map((booking) => {
        const startTime = moment(`${booking.date} ${booking.time[0]}`, "YYYY-MM-DD HH:mm").toDate();
        const endTime = moment(`${booking.date} ${booking.time[booking.time.length - 1]}`, "YYYY-MM-DD HH:mm")
          .add(30, "minutes") 
          .toDate();
      
        return {
          id: booking.id,
          title: booking.name,
          start: startTime,
          end: endTime,
          allDay: false,
        };
      });

      setEvents(formattedEvents);
    }

    fetchBookings();
  }, []);

  if (isMobile) return null;

  return (
    <section>
      <div className={styles.calendar}>
        <h2>Weekly Schedule</h2><br/>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultView="week"
          views={["week"]}
          step={30} 
          timeslots={2}
          min={new Date(new Date().setHours(8, 0, 0))}
          max={new Date(new Date().setHours(23, 0, 0))} 
        />
      </div>
    </section>
  );
}
