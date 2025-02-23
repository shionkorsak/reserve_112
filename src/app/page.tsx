import Image from "next/image";
import styles from "./page.module.css";
//import BookingForm from "@/components/bookingForm";
import Footer from "@/components/footer";
import UpcomingBookings from "@/components/upcomingBookings";
import BookingCalendar from "@/components/calendar";
import RoomStatus from "@/components/available";
import WeeklyBookings from "@/components/weekBooking";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.columns}>
        <div>
          <RoomStatus/>
          <BookingCalendar/>
          <h2>Upcoming Bookings</h2>
          <UpcomingBookings/>
        </div>
        <div>
          <WeeklyBookings/>
        </div>
        </div>
      </main>
      <Footer/>
    </div>
  );
}
