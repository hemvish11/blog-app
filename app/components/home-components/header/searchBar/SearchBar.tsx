import React, { useEffect, useState } from "react";
import styles from "./SearchBar.module.css";
import {
  setQuery,
  setFilteredItems,
  resetFilteredItems,
} from "@/store/slices/search/searchSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
interface Blog {
  userId: string;
  userPhoto: string;
  name: string;
  title: string;
  description: string;
  img: string;
}
const SearchBar = () => {
  const dispatch = useAppDispatch();
  const allBlogs = useAppSelector((state) => state.allBlogs.allItems);

  const [query, setQueryState] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQueryState(e.target.value);
    dispatch(setQuery(e.target.value));
  };

  const performSearch = (searchQuery: string) => {
    const allBlogItems = [...allBlogs].reverse();
    if (searchQuery.length >= 3) {
      const filtered: Blog[] = allBlogItems.filter((blog) => {
        return blog.title
          .toLowerCase()
          .includes(searchQuery.toLocaleLowerCase());
      });
      dispatch(setFilteredItems(filtered));
      console.log("filtered", filtered);
    } else {
      dispatch(setFilteredItems(allBlogItems));
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
