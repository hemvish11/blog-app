import { navLinks } from "@/app/data/navLinks";
import Link from "next/link";
import styles from "./Header.module.css";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Link href={"/home"}>
        <span className={styles.logo}>Convey Zone</span>
      </Link>

      <nav className={styles.nav}>
        {navLinks.map((link, index) => {
          return (
            <Link href={link.href} key={index}>
              <button className={styles.navLinks}>{link.name}</button>
            </Link>
          );
        })}
        <Link href="/login">
          <button className={styles.getStarted}>Get started</button>
        </Link>
      </nav>
    </header>
  );
};
export default Header;
