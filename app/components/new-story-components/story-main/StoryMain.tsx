"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./StoryMain.module.css";
import Image from "next/image";

interface FormData {
  userId: string;
  title: string;
  description: string;
  img: string;
}
type SetFormData = React.Dispatch<React.SetStateAction<FormData>>;

interface StoryMainProps {
  formData: FormData;
  setFormData: SetFormData;
}

const StoryMain: React.FC<StoryMainProps> = ({ formData, setFormData }) => {
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

  const [rows, setRows] = useState<number>(1);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // setText(event.target.value);
    const lineCount = Math.ceil(formData.description.length / 68) + 2;
    setRows(lineCount);
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // console.log(formData);
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
            name="title"
            placeholder="Title"
            onChange={handleChange}
            className={styles.title}
            value={formData.title}
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
            value={formData.description}
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
