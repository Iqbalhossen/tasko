import { createSlice } from "@reduxjs/toolkit";

const getCookie = (name) => {
  if (typeof document === "undefined") return null;
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="));
  return cookie ? cookie.split("=")[1] : null;
};

let token = null;
let user = null;

if (typeof window !== "undefined") {
  token = getCookie("assignment_token");
  const userString = localStorage.getItem("userInfo");
  user = userString ? JSON.parse(userString) : null;
}

const initialState = {
  userInfo: user || null,
  token: token || null,
  isAuthenticated: !!token,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload.userData;
      state.token = action.payload.userToken;
      state.isAuthenticated = true;
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "userInfo",
          JSON.stringify(action.payload.userData)
        );
      }
    },
    logout: (state, action) => {
      state.userInfo = null;
      state.isAuthenticated = false;
      if (typeof window !== "undefined") {
        localStorage.removeItem("userInfo");
      }
    },
    
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
