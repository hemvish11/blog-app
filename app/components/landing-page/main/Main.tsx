import Link from "next/link";
import styles from "./Main.module.css";
import Image from "next/image";

const Main: React.FC = () => {
  return (
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
  );
};
export default Main;
