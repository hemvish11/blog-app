"use client";
import Image from "next/image";
import styles from "./ArticleCard.module.css";

type CardPropType = {
  name: string;
  title: string;
  description: string;
  img: string;
};

const ArticleCard = ({ name, title, description, img }: CardPropType) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <Image
          height={10}
          width={10}
          src="/profile-pic.jpg"
          alt="Author"
          className={styles.authorImage}
        />
        <div>
          <h2 className={styles.authorName}>{name}</h2>
          {/* <p className={styles.tag}>in Stackademic</p> */}
        </div>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.mainContent}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.description}>{description.substring(0,100)}...</p>

          <p className={styles.date}>Feb 19</p>

          <div className={styles.footer}>
            <span>2K views</span> <span>23 comments</span>
          </div>
        </div>

        <Image
          width={50}
          height={50}
          src="/article-image.jpg"
          alt="Article"
          className={styles.articleImage}
        />
      </div>
    </div>
  );
};

export default ArticleCard;
