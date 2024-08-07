import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface AuthState {
  token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  status: "idle",
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }) => {
    const response = await axios.get("/api/users", {
      params: { email: credentials.email, password: credentials.password },
    });
    console.log("RTK: ", response);
    if(response.status === 200){
      localStorage.setItem("token", response.data.token);
    }
    return response.data.token;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        console.log("Pending state: ", state);
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log("Fulfilled state: ", action.payload);
        state.status = "succeeded";
        state.token = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        console.log("Rejected state: ", state);
        state.status = "failed";
        state.error = action.error.message ?? "Failed to login";
      });
  },
});

export const { logout, setError } = authSlice.actions;

export default authSlice.reducer;
