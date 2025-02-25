//import Image from "next/image";
import styles from "@/app/page.module.css";
//import Link from "next/link";

export default function Footer() {
    return (
        <footer className={styles.footer}>
                <div className={styles.contact}>
                <p>If something goes wrong, contact us:</p>
                <a
                href="https://www.instagram.com/nthu_ibpsa/"
                target="_blank"
                rel="noopener noreferrer"
                >
                <img
                    src="/instagram.svg"
                    alt="Instagram icon"
                    width={16}
                    height={16}
                    className={styles.logo}
                />
                </a>
                <a
                href="mailto:ibpsanthu@gmail.com?subject=Error with booking website - {your name}"
                target="_blank"
                rel="noopener noreferrer"
                >
                <img
                    src="/at.svg"
                    alt="Window icon"
                    width={17}
                    height={16}
                    className={styles.logo}
                />
                </a>
                </div>
            </footer>
    )
}