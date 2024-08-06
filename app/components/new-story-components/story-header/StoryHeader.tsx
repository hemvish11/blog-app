"use client";
import styles from "./StoryHeader.module.css";
import homeNavLinks from "@/app/data/home/homeNavLinks";
import Image from "next/image";
import Link from "next/link";

const StoryHeader: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headingContainer}>
        <span className={styles.logo}>Convey Zone</span>
        <span className={styles.draft} >Draft in Hemant Vishwakarma</span>
      </div>

      <nav className={styles.nav}>
        {homeNavLinks.map((link) => {
          return (
            <Link href="#" key={link.src}>
              <Image
                src={link.src}
                height={25}
                width={25}
                alt="Nav icon"
              ></Image>
            </Link>
          );
        })}
      </nav>
    </header>
  );
};
export default StoryHeader;
