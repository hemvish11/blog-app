import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './slices/search/searchSlice';
import allBlogsReducer from './slices/allBlogs/allBlogsSlice';
import userReducer from './slices/users/userSlice';
import authReducer from './slices/users/authSlice';

const store = configureStore({
    reducer: {
        search: searchReducer,
        allBlogs: allBlogsReducer,
        users: userReducer,
        auth: authReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;