"use client";
import React, { useEffect, useState } from "react";
import styles from "./UploadImage.module.css";
import {
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
  ref,
} from "firebase/storage";
import { app } from "@/firebase";
import { setFormData } from "@/store/slices/blogs/blogSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";

interface uploadedImageProps {}

interface uploadedImageProps {
  imageRef: React.RefObject<HTMLInputElement> | null;
}

const UploadImage2: React.FC<uploadedImageProps> = ({ imageRef }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [image, setImage] = useState<File | null>(null);
  const dispatch = useAppDispatch();
  const {blog} = useAppSelector((state)=> state.blog);

  const showPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image: File) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + "-" + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.error("Upload error:", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            const newFormData = {...blog,img: downloadUrl};
          dispatch(setFormData(newFormData));
        });
        console.log("Image saved successfully");
      }
    );
  };

  return (
    <>
      <input
        ref={imageRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          setImage(file || null);
          showPhoto(e);
        }}
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

export default UploadImage2;
