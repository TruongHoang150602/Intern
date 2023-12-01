// slices/testSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllTestAPI = createAsyncThunk("test/getTests", async () => {
  try {
    const response = await axios.get("http://localhost:3001/tests");
    const data = response.data;
    console.log(data);
    return data;
  } catch (error) {
    throw new Error("Failed to fetch test data from API");
  }
});

const testSlice = createSlice({
  name: "test",
  initialState: {
    testList: [],
    numberTest: null,
    isLoading: false,
    error: null,
    isSubmitted: false,
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
    },
    closeModal(state) {
      state.isOpenModal = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTestAPI.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllTestAPI.fulfilled, (state, action) => {
        state.isLoading = false;
        state.testList = action.payload;
        state.numberTest = state.testList.length;
      })
      .addCase(getAllTestAPI.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { openModal, closeModal } = testSlice.actions;

export const selectTestList = (state) => state.test.testList;
export const selectIsLoading = (state) => state.test.isLoading;
export const selectError = (state) => state.test.error;
export const selectIsOpenModal = (state) => state.test.isOpenModal;
export const selectIsSubmitted = (state) => state.test.isSubmitted;

export default testSlice.reducer;
