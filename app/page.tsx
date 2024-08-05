import styles from "@/app/Home.module.css";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { navLinks } from "./data/navLinks";
import { footerData } from "./data/footerData";
export default function Home() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>Convey Zone</div>
        <nav className={styles.nav}>
          {navLinks.map((link) => {
            return (
              <Link href={link.href}>
                <button className={styles.navLinks}>{link.name}</button>
              </Link>
            );
          })}
          <Link href="/login">
            <button className={styles.getStarted}>Get started</button>
          </Link>
        </nav>
      </header>
      <main className={styles.main}>
        <div>
          <h1 className={styles.title}>Human stories & ideas</h1>
          <p className={styles.description}>
            A place to read, write, and deepen your understanding
          </p>
          <Link href="/login">
            <button className={styles.startReading}>Start reading</button>
          </Link>
        </div>
        <Image
          width={500}
          height={500}
          src="/LandingPage3.png"
          alt="Landing page img"
          className={styles.homepageImg}
        />
      </main>

      <footer className={styles.footer}>
        {footerData.map((link) => {
          return (
            <Link href={link.href}>
              <button className={styles.navLinks}>{link.name}</button>
            </Link>
          );
        })}
      </footer>
    </div>
  );
}
