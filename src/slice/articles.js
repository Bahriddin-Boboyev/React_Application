import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  articles: [],
  error: null,
  articleDetail: null,
};

export const articleSlice = createSlice({
  name: "article",
  initialState: initialState,
  reducers: {
    getArticlesStart: (state) => {
      state.isLoading = true;
    },
    getArticlesSuccess: (state, actions) => {
      state.isLoading = false;
      state.articles = actions.payload;
    },
    getArticlesFailed: (state, actions) => {
      state.isLoading = false;
      state.error = actions.payload;
    },
    getArticlesDetailStart: (state) => {
      state.isLoading = true;
    },
    getArticlesDetailSuccess: (state, actions) => {
      state.isLoading = false;
      state.articleDetail = actions.payload;
    },
    getArticlesDetailFailed: (state) => {
      state.isLoading = false;
    },
    postArticleStart: (state) => {
      state.isLoading = true;
    },
    postArticleSuccess: (state) => {
      state.isLoading = false;
    },
    postArticleFailed: (state) => {
      state.isLoading = false;
    },
  },
});
export const {
  getArticlesStart,
  getArticlesSuccess,
  getArticlesFailed,
  getArticlesDetailStart,
  getArticlesDetailSuccess,
  getArticlesDetailFailed,
  postArticleStart,
  postArticleSuccess,
  postArticleFailed,
} = articleSlice.actions;
export default articleSlice.reducer;
