"use client"
import StoryHeader from "@/app/components/new-story-components/story-header/StoryHeader";
import StoryMain from "@/app/components/new-story-components/story-main/StoryMain";
import protectedAuth from "../components/protectedAuth";

const NewStoryPage = () => {
  return (
    <div>
      <StoryHeader />
      <StoryMain />
    </div>
  );
};
export default protectedAuth(NewStoryPage);