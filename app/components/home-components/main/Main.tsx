"use client";
import styles from "./Main.module.css";
import ArticleCard from "../../Article/Card/ArticleCard";
import Link from "next/link";
import { useEffect } from "react";
import RightSideComponent from "./right/RightSideComponent";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
// import { setFilteredItems } from "@/store/slices/search/searchSlice";
import { setAllBlogsSlice } from "@/store/slices/allBlogs/allBlogsSlice";

type Blog = {
  userId: string;
  title: string;
  description: string;
  img: string;
};

const Main: React.FC = () => {
  const blogs = useAppSelector((state) => state.search.filteredItems);
  const dispatch = useAppDispatch();

  const fetchBlogs = async () => {
    const response = await fetch("/api/blogs", {
      headers: {
        Accept: "Application/json",
        method: "GET",
      },
    });
    const data: Blog[] = await response.json();
    dispatch(setAllBlogsSlice(data));
    console.log("All blogs data", data);
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
          blogs.map((blog,index) => {
            return (
              <ArticleCard
                key={index}
                name={"Hv"}
                title={blog.title}
                description={blog.description}
                img={blog.img}
                // img={"/newStory/blog.jpg"}
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
