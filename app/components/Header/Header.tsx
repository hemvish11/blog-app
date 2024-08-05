import styles from "@/app/components/Header/Header.module.css";

import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <h1>Medium</h1>
      <nav>
        <ul>
          <li>For you</li>
          <li>Following</li>
          <li>Mindfulness</li>
          <li>Technology</li>
          <li>Psychology</li>
          <li>Business</li>
          <li>...</li>
        </ul>
      </nav>
      <Link href="/login" className={styles.loginLink}>Login</Link>
    </header>
  );
};

export default Header;