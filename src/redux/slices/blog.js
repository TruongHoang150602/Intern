// slices/blogSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getBlogsAPI = createAsyncThunk("blog/getBlogs", async () => {
  try {
    const response = await axios.get(
      "https://653b1ca02e42fd0d54d4b3b0.mockapi.io/blogs"
    );
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch blog data from API");
  }
});

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogList: [],
    isLoading: false,
    error: null,
    selectedBlog: null,
    isOpenModal: false,
  },
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    openModal(state, action) {
      state.isOpenModal = true;
      //   state.selectedBlog = action.payload;s
    },
    closeModal(state) {
      state.isOpenModal = false;
      state.currentBlog = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBlogsAPI.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getBlogsAPI.fulfilled, (state, action) => {
        state.isLoading = false;
        state.blogList = action.payload;
        state.numberBlog = state.blogList.length;
      })
      .addCase(getBlogsAPI.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { openModal, closeModal } = blogSlice.actions;

export const selectBlogList = (state) => state.blog.blogList;
export const selectCurrentBlog = (state) => state.blog.currentBlog;
export const selectIsLoading = (state) => state.blog.isLoading;
export const selectError = (state) => state.blog.error;
export const selectIsOpenModal = (state) => state.blog.isOpenModal;

export default blogSlice.reducer;
