import Link from "next/link";
import Image from "next/image";
import styles from "@/app/page.module.css";

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.logoContainer}>
                <a
                href="/"
                //target="_blank"
                //rel="noopener noreferrer"
                >
                <Image src="/logo.svg" alt="IBPSA Logo" width={40} height={40}/>
                <Image src="/logo_2.svg" alt="" width={100} height={35}/>
                </a>
            </div>
            <Link href="/book"><button className={styles.button}>Book Now</button></Link>
        </header>
    );
}