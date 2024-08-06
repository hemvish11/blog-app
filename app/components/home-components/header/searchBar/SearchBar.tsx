import React, { useEffect, useState } from "react";
import styles from "./SearchBar.module.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import {
  setQuery,
  setFilteredItems,
  resetFilteredItems,
} from "@/store/slices/search/searchSlice";
type Blog = {
  id: number;
  name: string;
  title: string;
  description: string;
  img: string;
};
const SearchBar: React.FC = () => {
  const blogs: Blog[] = [
    {
      id: 1,
      name: "Hemant",
      title: "First Blog Post",
      description:
        "This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.",
      img: "",
    },
    {
      id: 2,
      name: "Sargam",
      title: "Second Blog Post",
      description: "This is the second blog post.",
      img: "",
    },
    {
      id: 3,
      name: "Rishabh",
      title: "First Blog Post",
      description: "This is the first blog post.",
      img: "",
    },
    {
      id: 4,
      name: "Ankit",
      title: "Second Blog Post",
      description: "This is the second blog post.",
      img: "",
    },
  ];
  const dispatch = useDispatch<AppDispatch>();
  const [query, setQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState<Blog[]>(blogs);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(e.target.value));
  };

  const performSearch = (searchQuery: string) => {
    if (searchQuery.length >= 3) {
      const filtered = blogs.filter((blog) => {
        return blog.title
          .toLowerCase()
          .includes(searchQuery.toLocaleLowerCase());
      });
      dispatch(setFilteredItems(filtered));
      console.log(filtered);
    } else {
      dispatch(setFilteredItems(blogs));
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      performSearch(query);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [query, dispatch]);

  return (
    <form className={styles.searchForm}>
      <input
        type="text"
        className={styles.searchInput}
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
      />
    </form>
  );
};

export default SearchBar;
