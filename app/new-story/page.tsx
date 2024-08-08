"use client";
import StoryHeader from "@/app/components/new-story-components/story-header/StoryHeader";
import StoryMain from "@/app/components/new-story-components/story-main/StoryMain";
import protectedAuth from "../components/protectedAuth";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import { setFormData } from "@/store/slices/blogs/blogSlice";

const NewStoryPage = () => {
  const { userId, userName, userPhoto } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { blog } = useAppSelector((state) => state.blog);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const newFormData = {
        title: "",
        description: "",
        img: "/newStory/blog.jpg",
        userId: userId,
        name: userName,
        userPhoto: userPhoto,
      };
      dispatch(setFormData(newFormData));
    }
  }, []);

  return (
    <>
      <StoryHeader />
      <StoryMain />
    </>
  );
};
export default protectedAuth(NewStoryPage);
