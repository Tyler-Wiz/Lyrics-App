import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IAuth } from "@/libs/IAuth";
import { User, LoginUser } from "@/libs/IUser";
import axios from "axios";
import { serverURL } from "@/api/api";
import jwtDecode from "jwt-decode";
import { getFromLocalStorage } from "@/helpers/useLocalStorage";

const initialState: IAuth = {
  token: getFromLocalStorage("token"),
  name: "",
  email: "",
  _id: "",
  registerStatus: "",
  registerError: "",
  loginStatus: "",
  loginError: "",
  userLoaded: false,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (user: User, { rejectWithValue }) => {
    try {
      const token = await axios.post(`${serverURL}/register`, {
        name: user.name,
        email: user.email,
        password: user.password,
      });
      localStorage.setItem("token", token.data);
      return token.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/logingUser",
  async (user: LoginUser, { rejectWithValue }) => {
    try {
      const token = await axios.post(`${serverURL}/login`, {
        email: user.email,
        password: user.password,
      });
      fetch("/api/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token.data }),
      });
      localStorage.setItem("token", token.data);
      return token.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOutUser: (state) => {
      localStorage.removeItem("token");
      fetch("/api/logout", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      return {
        ...state,
        token: "",
        name: "",
        email: "",
        _id: "",
        registerStatus: "",
        registerError: "",
        loginStatus: "",
        loginError: "",
        userLoaded: false,
      };
    },
    getUser: (state) => {
      const token = state.token;
      if (token) {
        const user: IAuth = jwtDecode(token);
        return {
          ...state,
          name: user.name,
          email: user.email,
          _id: user._id,
          userLoaded: true,
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      return { ...state, registerStatus: "pending" };
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      if (action.payload) {
        const user: IAuth = jwtDecode(action.payload);
        return {
          ...state,
          token: action.payload,
          name: user.name,
          email: user.email,
          _id: user._id,
          registerStatus: "success",
        };
      } else return state;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      return {
        ...state,
        registerStatus: "rejected",
        registerError: action.payload,
      };
    });
    builder.addCase(loginUser.pending, (state) => {
      return { ...state, loginStatus: "pending" };
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      if (action.payload) {
        const user: IAuth = jwtDecode(action.payload);
        return {
          ...state,
          token: action.payload,
          name: user.name,
          email: user.email,
          _id: user._id,
          loginStatus: "success",
        };
      } else return state;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      return {
        ...state,
        loginStatus: "rejected",
        loginError: action.payload,
      };
    });
  },
});

export const { logOutUser, getUser } = authReducer.actions;
export default authReducer.reducer;
