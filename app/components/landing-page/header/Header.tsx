import { navLinks } from "@/app/data/navLinks";
import Link from "next/link";
import styles from "./Header.module.css";

const Header: React.FC = () => {
  return (
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
  );
};
export default Header;
