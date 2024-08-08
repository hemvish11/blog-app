"use client";
import styles from "./Header.module.css";
import homeNavLinks from "@/app/data/home/homeNavLinks";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "./searchBar/SearchBar";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks/hooks";
import { logout } from "@/store/slices/users/authSlice";

const Header: React.FC = () => {
  const route = useRouter();
  const dispatch = useAppDispatch();
  const handleLogOut = () => {
    dispatch(logout());
    route.push("/login");
  };
  return (
    <header className={styles.header}>
      <div className={styles.headingContainer}>
        <Link href={"/home"}>
          <span className={styles.logo}>Convey Zone</span>
        </Link>

        <div>
          <SearchBar />
        </div>
      </div>
      <nav className={styles.nav}>
        {homeNavLinks.map((link) => {
          return (
            <Link href={link.href} key={link.src}>
              <Image
                src={link.src}
                height={25}
                width={25}
                alt="Nav icon"
                loading="lazy"
              />
            </Link>
          );
        })}
        <button onClick={handleLogOut} className={styles.logout}>
          Log out
        </button>
      </nav>
    </header>
  );
};
export default Header;
