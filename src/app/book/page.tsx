import BookingForm from "@/components/bookingForm";
import styles from "@/app/page.module.css";
import Footer from "@/components/footer";

export default function Book(){
    return(
        <div className={styles.bookings}>
            <main className={styles.main}>
                <BookingForm />
            </main>
            <Footer/>
        </div>
    )
}