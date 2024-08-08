"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
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

  const [text, setText] = useState<string>("");
  const [rows, setRows] = useState<number>(1);

  useLayoutEffect(() => {
    const lineCount = Math.ceil(text.length/68)+2;
    setRows(lineCount);
  }, [text]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
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

          <textarea
            cols={500}
            ref={descriptionRef}
            value={text}
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
