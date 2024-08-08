"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./StoryMain.module.css";
import Image from "next/image";
import UploadImage2 from "@/app/extraComponents/uploadImage/UploadImage2";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import {
  setFormData,
  setIsDescriptionFilled,
} from "@/store/slices/blogs/blogSlice";

const StoryMain = () => {
  const [showTitleOption, setShowTitleOption] = useState(true);
  const [showDescriptionOption, setShowDescriptionOption] = useState(false);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const imageRef = useRef<HTMLInputElement | null>(null);
  const { userId, userName, userPhoto } = useAppSelector((state) => state.auth);
  const { blog } = useAppSelector((state) => state.blog);
  const dispatch = useAppDispatch();

  const handleFocusTitle = () => {
    setShowTitleOption(true);
    setShowDescriptionOption(false);
  };
  const handleFocusDescription = () => {
    setShowTitleOption(false);
    setShowDescriptionOption(true);
  };

  const [rows, setRows] = useState<number>(12);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    const { name, value } = event.target;
    const lineCount = Math.ceil(blog.description.length / 68) + 5;
    setRows(lineCount);
    const newFormData = {
      ...blog,
      userId,
      name: userName,
      userPhoto,
      [name]: value,
    };
    dispatch(setFormData(newFormData));
  };

  useEffect(() => {
    if (blog.title.length > 0 && blog.description.length > 0) {
      dispatch(setIsDescriptionFilled(true));
    } else {
      dispatch(setIsDescriptionFilled(false));
    }
  }, [blog.title.length, blog.description.length]);

  const handleButtonClick = () => {
    if (!imageRef) return;

    if (imageRef.current) {
      imageRef.current.click();
    }
  };

  return (
    <main>
      <form className={styles.container}>
        <div className={styles.inputContainer}>
          {showTitleOption && (
            <Image
              width={40}
              height={40}
              src="/newStory/plus.png"
              alt="More icons"
              loading="lazy"
              onClick={handleButtonClick}
              className={styles.plusImageTitle}
            />
          )}
          <input
            required
            ref={titleRef}
            type="text"
            name="title"
            placeholder="Title"
            onChange={handleChange}
            className={styles.title}
            value={blog.title}
            onFocus={handleFocusTitle}
          />
        </div>
        <UploadImage2 imageRef={imageRef} />
        <div className={styles.inputContainer}>
          {showDescriptionOption && (
            <Image
              width={40}
              height={40}
              src="/newStory/plus.png"
              loading="lazy"
              alt="More icons"
              onClick={handleButtonClick}
              className={styles.plusImageDescription}
            />
          )}
          <textarea
            cols={500}
            ref={descriptionRef}
            value={blog.description}
            name="description"
            onChange={handleChange}
            rows={rows}
            placeholder="Tell your story..."
            className={styles.description}
            onFocus={handleFocusDescription}
          />
        </div>
      </form>
    </main>
  );
};

export default StoryMain;
