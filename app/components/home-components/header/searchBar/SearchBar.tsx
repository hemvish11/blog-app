import React, { useEffect, useState } from "react";
import styles from "./SearchBar.module.css";
import {
  setQuery,
  setFilteredItems,
  resetFilteredItems,
} from "@/store/slices/search/searchSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
type Blog = {
  id: number;
  name: string;
  title: string;
  description: string;
  img: string;
};
const SearchBar = () => {
  // const blogs: Blog[] = [
  //   {
  //     id: 1,
  //     name: "Hemant",
  //     title: "First Blog Post",
  //     description:
  //       "This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.This is the first blog post.",
  //     img: "",
  //   },
  //   {
  //     id: 2,
  //     name: "Sargam",
  //     title: "Second Blog Post",
  //     description: "This is the second blog post.",
  //     img: "",
  //   },
  //   {
  //     id: 3,
  //     name: "Rishabh",
  //     title: "First Blog Post",
  //     description: "This is the first blog post.",
  //     img: "",
  //   },
  //   {
  //     id: 4,
  //     name: "Ankit",
  //     title: "Second Blog Post",
  //     description: "This is the second blog post.",
  //     img: "",
  //   },
  // ];

  const dispatch = useAppDispatch();
  const allBlogs = useAppSelector((state) => state.allBlogs.allItems);

  const [query, setQueryState] = useState("");
  // const [filteredItems, setFilteredItemsState] = useState<Blog[]>(allBlogs);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQueryState(e.target.value);
    dispatch(setQuery(e.target.value));
  };

  const performSearch = (searchQuery: string) => {
    if (searchQuery.length >= 3) {
      const filtered = allBlogs.filter((blog) => {
        return blog.title
          .toLowerCase()
          .includes(searchQuery.toLocaleLowerCase());
      });
      // setFilteredItemsState(filtered);
      dispatch(setFilteredItems(filtered));
      console.log("filtered", filtered);
    } else {
      // setFilteredItems(allBlogs);
      dispatch(setFilteredItems(allBlogs));
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      performSearch(query);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [query, allBlogs, performSearch]);

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
