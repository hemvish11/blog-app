"use client";
import styles from "./StoryHeader.module.css";
import homeNavLinks from "@/app/data/home/homeNavLinks";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import { postBlog } from "@/store/slices/blogs/blogSlice";
import Image from "next/image";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";

// interface FormData {
//   userId: string;
//   userPhoto: string;
//   name: string;
//   title: string;
//   description: string;
//   img: string;
// }
// interface StoryHeaderProps {
//   formData: FormData;
// }

// const StoryHeader: React.FC<StoryHeaderProps> = ({ formData }) => {
const StoryHeader = () => {
  const { userName } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { blog } = useAppSelector((state) => state.blog);

  const handlePostSubmit = async () => {
    console.log("Submitting the post.....");
    try {
      await dispatch(postBlog(blog));
      console.log("Post submitted,blog: " + blog);
      router.push("/home");
    } catch (error) {
      console.log("Post not submitted");
      router.push("/");
    }
  };
  return (
    <header className={styles.header}>
      <div className={styles.headingContainer}>
        <span className={styles.logo}>Convey Zone</span>
        <span className={styles.draft}>Draft in {userName}</span>
      </div>

      <nav className={styles.nav}>
        <button onClick={handlePostSubmit}> Publish </button>
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
