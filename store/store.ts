import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./slices/search/searchSlice";
import allBlogsReducer from "./slices/allBlogs/allBlogsSlice";
import userReducer from "./slices/users/userSlice";
import authReducer from "./slices/users/authSlice";
import blogReducer from "./slices/blogs/blogSlice";
import articleReducer from "./slices/article/articleSilce";

const store = configureStore({
  reducer: {
    search: searchReducer,
    allBlogs: allBlogsReducer,
    users: userReducer,
    auth: authReducer,
    blog: blogReducer,
    article: articleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;