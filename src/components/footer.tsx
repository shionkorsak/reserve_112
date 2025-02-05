import Image from "next/image";
import styles from "@/app/page.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
                <a> If something goes wrong, contact us: </a>
                <a
                href="https://www.instagram.com/nthu_ibpsa/"
                target="_blank"
                rel="noopener noreferrer"
                >
                <Image
                    className={styles.logo}
                    src="/instagram.svg"
                    alt="Instagram icon"
                    width={16}
                    height={16}
                />
                </a>
                <a
                href="mailto:ibpsanthu@gmail.com?subject=Error with booking website - {your name}"
                target="_blank"
                rel="noopener noreferrer"
                >
                <Image
                    className={styles.logo}
                    src="/at.svg"
                    alt="Window icon"
                    width={20}
                    height={16}
                />
                </a>
            </footer>
    )
}