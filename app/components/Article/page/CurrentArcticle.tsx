"use client";
import React from "react";
import styles from "./CurrentArticle.module.css";
import { useAppSelector } from "@/store/hooks/hooks";

const CurrentArcticle = () => {
  const article = useAppSelector((state) => state.article);

  return (
    <div className={styles.articleContainer}>
      <main className={styles.mainContent}>
        <h1 className={styles.title}>{article.title}</h1>
        <div className={styles.authorSection}>
          <img
            src={article.userPhoto}
            alt="Author"
            className={styles.authorImage}
          />
          <div>
            <p className={styles.authorName}>{article.name}</p>
            <p className={styles.publicationInfo}>
              Published in ILLUMINATION • 6 min read
            </p>
          </div>
        </div>
      </main>
      <img src={article.img} alt="article-image" className={styles.articleImage}/>
      <p className={styles.line}></p>
      <div className={styles.content}>
        <p>{article.description}</p>
      </div>
    </div>
  );
};

export default CurrentArcticle;
