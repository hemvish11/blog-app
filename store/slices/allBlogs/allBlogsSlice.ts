// src/store/slices/search/searchSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Blog {
  userId: string;
  userPhoto: string;
  name: string;
  title: string;
  description: string;
  img: string;
}

interface SearchState {
  allItems: Blog[];
}

const initialState: SearchState = {
  allItems: [],
};

const allBlogsSlice = createSlice({
  name: "allBlogs",
  initialState,
  reducers: {
    setAllBlogsSlice(state, action: PayloadAction<Blog[]>) {
      state.allItems = action.payload;
    },
  },
});

export const { setAllBlogsSlice } = allBlogsSlice.actions;

export default allBlogsSlice.reducer;
