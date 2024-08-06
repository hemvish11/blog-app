"use client";
import React, { useRef, useState } from "react";
import styles from "./StoryMain.module.css";
import Image from "next/image";

const StoryMain = () => {
  const [showTitleOption, setShowTitleOption] = useState(true);
  const [showDescriptionOption, setShowDescriptionOption] = useState(false);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  const handleFocusTitle = () => {
    setShowTitleOption(true);
    setShowDescriptionOption(false);
  };
  const handleFocusDescription = () => {
    setShowTitleOption(false);
    setShowDescriptionOption(true);
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
              className={styles.plusImageTitle}
            />
          )}
          <input
            ref={titleRef}
            type="text"
            placeholder="Title"
            className={styles.title}
            onFocus={handleFocusTitle}
          />
        </div>
        <div className={styles.inputContainer}>
          {showDescriptionOption && (
            <Image
              width={40}
              height={40}
              src="/newStory/plus.png"
              alt="More icons"
              className={styles.plusImageDescription}
            />
          )}

          <input
            ref={descriptionRef}
            type="text"
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
