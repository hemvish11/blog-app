import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface Blog {
  userId: string;
  userPhoto: string;
  name: string;
  title: string;
  description: string;
  img: string;
}

const initialFormData = {
  userId: "",
  userPhoto: "",
  name: "",
  title: "",
  description: "",
  img: "/newStory/blog.jpg",
};

interface BlogState {
  blog: Blog;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  isImageUploaded: boolean;
  isDescriptionFilled: boolean;
}

const initialState: BlogState = {
  blog: initialFormData,
  status: "idle",
  error: null,
  isImageUploaded: true,
  isDescriptionFilled: false,
};

export const postBlog = createAsyncThunk(
  "blog/postBlog",
  async (blogData: Omit<Blog, "userId"> & { userId: string }) => {
    const response = await fetch(`/api/blogs?userId=${blogData.userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: blogData.name,
        title: blogData.title,
        description: blogData.description,
        img: blogData.img,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to post blog");
    }
    return data.Blog;
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setTitle: (state, action) => {
      state.blog.title = action.payload;
    },
    setDescription: (state, action) => {
      state.blog.description = action.payload;
    },
    setImage: (state, action) => {
      state.blog.img = action.payload;
    },
    setFormData: (state, action) => {
      state.blog = action.payload;
    },
    setIsImageUploaded: (state, action) => {
      state.isImageUploaded = action.payload;
    },
    setIsDescriptionFilled: (state, action) => {
      state.isDescriptionFilled = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postBlog.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postBlog.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.blog = action.payload;
      })
      .addCase(postBlog.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export const {
  setTitle,
  setDescription,
  setImage,
  setFormData,
  setIsImageUploaded,
  setIsDescriptionFilled,
} = blogSlice.actions;

export default blogSlice.reducer;
