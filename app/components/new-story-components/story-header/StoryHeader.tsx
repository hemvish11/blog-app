"use client";
import styles from "./StoryHeader.module.css";
import homeNavLinks from "@/app/data/home/homeNavLinks";
import { useAppSelector } from "@/store/hooks/hooks";
import Image from "next/image";
import Link from "next/link";

const StoryHeader: React.FC = () => {
  const {userName} = useAppSelector((state)=> state.auth)
  return (
    <header className={styles.header}>
      <div className={styles.headingContainer}>
        <span className={styles.logo}>Convey Zone</span>
        <span className={styles.draft} >Draft in {userName}</span>
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
