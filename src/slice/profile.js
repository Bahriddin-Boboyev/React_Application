import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  user: null,
  error: null,
  follow: null,
};

export const ProfileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    profileStar: (state) => {
      state.isLoading = true;
    },
    profileSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    profileFailed: (state) => {
      state.isLoading = false;
    },
    profileEditStart: (state) => {
      state.isLoading = true;
    },
    profileEditSuccess: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    profileEditFailed: (state) => {
      state.isLoading = false;
    },
    getProfileStar: (state, action) => {
      state.isLoading = true;
      state.user = action.payload;
    },
    getProfileSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    getProfileFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    followProfileStart: (state) => {
      state.isLoading = true;
    },
    followProfileSuccesses: (state, action) => {
      state.isLoading = false;
      state.follow = action.payload;
    },
    followProfileFailed: (state, action) => {
      state.isLoading = false;
      state.follow = action.payload;
    },
    delFollowStart: (state) => {
      state.isLoading = true;
    },
    delFollowSuccess: (state, action) => {
      state.isLoading = false;
      state.follow = action.payload;
    },
    delFollowFailed: (state, action) => {
      state.isLoading = false;
      state.follow = action.payload;
    },
  },
});

export default ProfileSlice.reducer;

export const {
  profileStar,
  profileSuccess,
  profileFailed,
  profileEditStart,
  profileEditSuccess,
  profileEditFailed,
  getProfileStar,
  getProfileSuccess,
  getProfileFailed,
  followProfileStart,
  followProfileSuccesses,
  followProfileFailed,
  delFollowStart,
  delFollowSuccess,
  delFollowFailed,
} = ProfileSlice.actions;
