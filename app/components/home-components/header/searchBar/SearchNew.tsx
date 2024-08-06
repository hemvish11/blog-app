// src/components/SearchBar.tsx
import React, { useEffect, useState } from "react";
import styles from "./SearchBar.module.css";
import { setQuery, setFilteredItems, resetFilteredItems } from "@/store/slices/search/searchSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";

type Blog = {
  id: number;
  name: string;
  title: string;
  description: string;
  img: string;
};

const SearchBar = () => {
  const blogs: Blog[] = [
    // Your blogs data
  ];

  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.search.filteredItems);
  console.log("Items from rtk state", items);

  const [query, setQueryState] = useState("");
  const [filteredItemsState, setFilteredItemsState] = useState<Blog[]>(blogs);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQueryState(e.target.value);
    dispatch(setQuery(e.target.value));
  };

  const performSearch = (searchQuery: string) => {
    if (searchQuery.length >= 3) {
      const filtered = blogs.filter((blog) =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredItemsState(filtered);
      dispatch(setFilteredItems(filtered));
      console.log(filtered);
    } else {
      setFilteredItemsState(blogs);
      dispatch(resetFilteredItems(blogs));
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
