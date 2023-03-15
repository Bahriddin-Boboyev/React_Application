import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/auth";
import articleReducer from "../slice/articles";
import profileReducer from "../slice/profile";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    article: articleReducer,
    profile: profileReducer,
  },
  devTools: process.env.NODE_EMV !== "production",
});
