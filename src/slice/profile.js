import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  user: null,
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
} = ProfileSlice.actions;
