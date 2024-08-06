"use client";
import styles from "./Main.module.css";
import ArticleCard from "../../Article/Card/ArticleCard";
import Link from "next/link";
import { useEffect, useState } from "react";
import RightSideComponent from "./right/RightSideComponent";

type Blog = {
  id: number;
  name: string;
  title: string;
  description: string;
  img: string;
};

const Main: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const fetchBlogs = async () => {
    const response = await fetch("/api", {
      headers: {
        Accept: "Application/json",
        method: "GET",
      },
    });
    const data: Blog[] = await response.json();
    setBlogs(data);
    console.log(data);
  };
  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.left}>
        <div className={styles.blogsType}>
          <Link href="#">
            <span className={styles.plusIcon}>+</span>
          </Link>
          <Link href="#">
            <span className={styles.active}>For you</span>
          </Link>
          <Link href="#">
            <span>Following</span>
          </Link>
        </div>
        {blogs &&
          blogs.map((blog) => {
            return (
              <ArticleCard
                key={blog.id}
                name={blog.name}
                title={blog.title}
                description={blog.description}
                img={blog.description}
              />
            );
          })}
      </div>
      <div className={styles.right}>
        <RightSideComponent />
      </div>
    </main>
  );
};
export default Main;
