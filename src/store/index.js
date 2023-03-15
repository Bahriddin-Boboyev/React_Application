import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/auth";
import articleReducer from "../slice/articles";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    article: articleReducer,
  },
  devTools: process.env.NODE_EMV !== "production",
});
