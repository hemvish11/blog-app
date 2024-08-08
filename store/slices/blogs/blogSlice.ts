// features/blog/blogSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface Blog {
  userId: string;
  title: string;
  description: string;
  img: string;
}

interface BlogState {
  blogs: Blog[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: BlogState = {
  blogs: [],
  status: 'idle',
  error: null,
};

export const postBlog = createAsyncThunk(
  'blog/postBlog',
  async (blogData: Omit<Blog, 'userId'> & { userId: string }) => {
    const response = await fetch(`/api/blogs?userId=${blogData.userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: blogData.title,
        description: blogData.description,
        img: blogData.img,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to post blog');
    }
    return data.Blog;
  }
);

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postBlog.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postBlog.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.blogs.push(action.payload);
      })
      .addCase(postBlog.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export default blogSlice.reducer;