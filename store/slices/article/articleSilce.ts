import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Article {
  userId: string;
  userPhoto: string;
  name: string;
  title: string;
  description: string;
  img: string;
}

const initialState: Article = {
  userId: "",
  userPhoto: "",
  name: "",
  title: "",
  description: "",
  img: "/newStory/blog.jpg",
};

const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setUserPhoto: (state, action) => {
      state.userPhoto = action.payload;
    },
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setImage: (state, action) => {
      state.img = action.payload;
    },
  },
});

export const {
  setUserId,
  setName,
  setUserPhoto,
  setTitle,
  setDescription,
  setImage,
} = articleSlice.actions;

export default articleSlice.reducer;
