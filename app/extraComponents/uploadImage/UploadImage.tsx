"use client";
import React, { useEffect, useState } from "react";
import styles from "./UploadImage.module.css";
import {
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
  ref,
} from "firebase/storage";

interface uploadedImageProps {
  imageRef: React.RefObject<HTMLInputElement> | null;
}

const UploadImage: React.FC<uploadedImageProps> = ({ imageRef }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [image, setImage] = useState<File | null>(null);

  // const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];

  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       setSelectedImage(reader.result as string);
  //     };
  //     console.log("FileReader", reader);
  //     reader.readAsDataURL(file);
  //   }
  // };

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    setImage(file || null);

    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setData({ ...data, img: downloadUrl });
        });
      }
    );
  };

  return (
    <>
      <input
        ref={imageRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className={styles.defaultUploader}
      />
      {selectedImage && (
        <img
          src={selectedImage}
          alt="uploaded image"
          loading="lazy"
          className={styles.image}
        />
      )}
    </>
  );
};

export default UploadImage;
