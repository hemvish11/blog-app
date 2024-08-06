// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './slices/search/searchSlice';
import allBlogsReducer from './slices/allBlogs/allBlogsSlice';

const store = configureStore({
    reducer: {
        search: searchReducer,
        allBlogs: allBlogsReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;