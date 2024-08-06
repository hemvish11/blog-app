import { footerData } from "@/app/data/footerData";
import Link from "next/link";
import styles from "./Footer.module.css"

const Footer:React.FC = () => {
    return (<footer className={styles.footer}>
        {footerData.map((link) => {
          return (
            <Link href={link.href}>
              <button className={styles.navLinks}>{link.name}</button>
            </Link>
          );
        })}
      </footer>)
}
export default Footer;