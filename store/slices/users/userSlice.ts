import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  name: string;
  email: string;
  password: string;
}

interface UserState {
  users: User[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UserState = {
  users: [],
  status: "idle",
  error: null,
};

export const addUser = createAsyncThunk(
  "users/addUser",
  async (user: Omit<User, "id">) => {
    const response = await axios.post("/api/users", user);
    return response.data;
  }
);
export const findUser = createAsyncThunk(
  "users/findUser",
  async (id: any) => {
    const response = await axios.get("/api/users",id);
    return response.data;
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setError(state,action: PayloadAction<string>){
      state.error = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users.push(action.payload);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to add user";
      });
  },
});

export const {setError} =userSlice.actions;
export default userSlice.reducer;