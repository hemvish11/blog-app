import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { redirect } from "next/navigation";

interface AuthState {
  userName: string;
  userId: string;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  userName: "",
  userId: "",
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }) => {
    try {
      const response = await fetch("/api/userLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        return "Login failed";
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      console.log(data);
      return data;
    } catch (error) {
      return error;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.userName = action.payload.name;
        state.userId = action.payload.userId;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, setError,setUserName,setUserId } = authSlice.actions;
export default authSlice.reducer;

// import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import axios from "axios";

// interface AuthState {
//   token: string | null;
//   status: "idle" | "loading" | "succeeded" | "failed";
//   error: string | null;
// }

// const initialState: AuthState = {
//   token: null,
//   status: "idle",
//   error: null,
// };

// export const login = createAsyncThunk(
//   "auth/login",
//   async (credentials: { email: string; password: string }) => {
//     const response = await axios.get("/api/users", {
//       params: { email: credentials.email, password: credentials.password },
//     });
//     console.log("RTK: ", response);
//     if(response.status === 200){
//       localStorage.setItem("token", response.data.token);
//     }
//     return response.data.token;
//   }
// );

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     logout: (state) => {
//       state.token = null;
//     },
//     setError: (state, action: PayloadAction<string>) => {
//       state.error = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(login.pending, (state) => {
//         console.log("Pending state: ", state);
//         state.status = "loading";
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         console.log("Fulfilled state: ", action.payload);
//         state.status = "succeeded";
//         state.token = action.payload;
//       })
//       .addCase(login.rejected, (state, action) => {
//         console.log("Rejected state: ", state);
//         state.status = "failed";
//         state.error = action.error.message ?? "Failed to login";
//       });
//   },
// });

// export const { logout, setError } = authSlice.actions;

// export default authSlice.reducer;
