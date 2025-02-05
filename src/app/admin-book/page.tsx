import AdminBookingForm from "@/components/adminBook";
import styles from "@/app/page.module.css";
import Footer from "@/components/footer";

export default function Book(){
    return(
        <div className={styles.page}>
            <main className={styles.main}>
                <h1>Admin Booking Form</h1>
                <AdminBookingForm />
            </main>
            <Footer/>
        </div>
    )
}