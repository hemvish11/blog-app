"use client";
import styles from "./StoryHeader.module.css";
import homeNavLinks from "@/app/data/home/homeNavLinks";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import { postBlog, setFormData } from "@/store/slices/blogs/blogSlice";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const StoryHeader = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { blog } = useAppSelector((state) => state.blog);
  const { userId, userName, userPhoto } = useAppSelector((state) => state.auth);
  const { isImageUploaded, isDescriptionFilled } = useAppSelector(
    (state) => state.blog
  );

  const handlePostSubmit = async () => {
    console.log("Submitting the post.....");
    try {
      await dispatch(postBlog(blog));
      console.log("Post submitted,blog: " + blog);
      const newFormData = {
        ...blog,
        userId: userId,
        name: userName,
        userPhoto: userPhoto,
      };
      dispatch(setFormData(newFormData));
      router.push("/home");
    } catch (error) {
      console.log("Post not submitted");
      router.push("/");
    }
  };
  return (
    <header className={styles.header}>
      <div className={styles.headingContainer}>
        <Link href="/home">
          <span className={styles.logo}>Convey Zone</span>
        </Link>

        <span className={styles.draft}>Draft in {userName}</span>
      </div>

      <nav className={styles.nav}>
        <button
          disabled={!isImageUploaded || !isDescriptionFilled}
          onClick={handlePostSubmit}
          className={styles.publish}
        >
          {!isImageUploaded ? "Uploading..." : "Publish"}{" "}
        </button>
        {homeNavLinks.map((link) => {
          return (
            <Link href="#" key={link.src}>
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
      </nav>
    </header>
  );
};
export default StoryHeader;
