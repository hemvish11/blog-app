import { footerData } from "@/app/data/footerData";
import Link from "next/link";
import styles from "./Footer.module.css"

const Footer:React.FC = () => {
    return (<footer className={styles.footer}>
        {footerData.map((link,index) => {
          return (
            <Link href={link.href} key={index}>
              <button className={styles.navLinks}>{link.name}</button>
            </Link>
          );
        })}
      </footer>)
}
export default Footer;