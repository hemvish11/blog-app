"use client";
import styles from "./Main.module.css";
import ArticleCard from "../../Article/Card/ArticleCard";
import Link from "next/link";
import { useEffect } from "react";
import RightSideComponent from "./right/RightSideComponent";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
// import { setFilteredItems } from "@/store/slices/search/searchSlice";
import { setAllBlogsSlice } from "@/store/slices/allBlogs/allBlogsSlice";
import { useRouter } from "next/navigation";
import {
  setDescription,
  setImage,
  setName,
  setTitle,
  setUserId,
  setUserPhoto,
} from "@/store/slices/article/articleSilce";

type Blog = {
  userId: string;
  userPhoto: string;
  name: string;
  title: string;
  description: string;
  img: string;
};

const Main: React.FC = () => {
  const blogs = useAppSelector((state) => state.search.filteredItems);
  const article = useAppSelector((state) => state.article);

  const dispatch = useAppDispatch();
  const router = useRouter();

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
  const handleOpenArticle = (blog: Blog) => {
    dispatch(setUserId(blog.userId));
    dispatch(setName(blog.name));
    dispatch(setUserPhoto(blog.userPhoto));
    dispatch(setTitle(blog.title));
    dispatch(setDescription(blog.description));
    dispatch(setImage(blog.img));
    console.log("Open article", blog);
    console.log("Current article", article);
    router.push("/article");
  };

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
          blogs.map((blog, index) => {
            return (
              <div key={index} onClick={() => handleOpenArticle(blog)}>
                <ArticleCard
                  key={index}
                  userPhoto={blog.userPhoto}
                  name={blog.name}
                  title={blog.title}
                  description={blog.description}
                  img={blog.img}
                />
              </div>
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
