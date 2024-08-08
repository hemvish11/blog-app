"use client";
import StoryHeader from "@/app/components/new-story-components/story-header/StoryHeader";
import StoryMain from "@/app/components/new-story-components/story-main/StoryMain";
import protectedAuth from "../components/protectedAuth";
import { useState } from "react";
import { useAppSelector } from "@/store/hooks/hooks";

const NewStoryPage = () => {
  const { userId ,userName,userPhoto} = useAppSelector((state) => state.auth);
  const initialFormData = {
    userId: typeof window !== "undefined" ? userId : "",
    userPhoto: typeof window !== "undefined" ? userPhoto : "",
    name: typeof window !== "undefined" ? userName : "",
    title: "",
    description: "",
    img: "/newStory/blog.jpg",
  };

  const [formData, setFormData] = useState(initialFormData);
  return (
    <>
      <StoryHeader formData={formData}/>
      <StoryMain formData={formData} setFormData={setFormData} />
    </>
  );
};
export default protectedAuth(NewStoryPage);