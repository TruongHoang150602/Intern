// slices/testSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { RootState } from "../store"; 
import { DELETE, GET, PUT, RequestData } from "../../utils/url"; // Thay đổi đường dẫn tùy thuộc vào vị trí của file http-utils
import APIConfig from "utils/APIConfig";
import { ITest } from "types/test";

export const getAllTestAPI = createAsyncThunk<ITest[], void>(
  "test/getTests",
  async () => {
    try {
      const requestData: RequestData = {
        url: APIConfig.GET_ALL_TESTS,
      };
      const response = await GET(requestData);
      return response;
    } catch (error) {
      throw new Error("Failed to fetch test data from API");
    }
  }
);

export const updateTestAPI = createAsyncThunk<ITest, { testId: string; name: string }>(
  "test/updateTest",
  async (payload) => {
    try {
      const { testId, name } = payload;
      const requestData: RequestData = {
        url: APIConfig.UPDATE_TEST.replace(":testId", testId),
        params: { name },
      };
      const response = await PUT(requestData);
      return response;
    } catch (error) {
      throw new Error("Failed to update test data from API");
    }
  }
);

export const deleteTestAPI = createAsyncThunk<void, string>(
  "test/deleteTest",
  async (testId) => {
    try {
      const requestData: RequestData = {
        url: APIConfig.DELETE_TEST.replace(":testId", testId),
      };
      await DELETE(requestData);
    } catch (error) {
      throw new Error("Failed to delete test data from API");
    }
  }
);


interface TestState {
  testList: ITest[];
  numberTest: number | null;
  isLoading: boolean;
  error: string | undefined;
  isSubmitted: boolean;
  isOpenModal: boolean;
}

const testSlice = createSlice({
  name: "test",
  initialState: {
    testList: [],
    numberTest: null,
    isLoading: false,
    error: undefined,
    isSubmitted: false,
    isOpenModal: false,
  } as TestState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },

    openModal(state) {
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
        state.error = undefined;
      })
      .addCase(getAllTestAPI.fulfilled, (state, action) => {
        state.isLoading = false;
        state.testList = action.payload;
        state.numberTest = state.testList.length;
      })
      .addCase(getAllTestAPI.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateTestAPI.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(updateTestAPI.fulfilled, (state, action) => {
        state.isLoading = false;
        // Handle update success if needed
      })
      .addCase(updateTestAPI.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteTestAPI.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(deleteTestAPI.fulfilled, (state, action) => {
        state.isLoading = false;
        // Handle delete success if needed
      })
      .addCase(deleteTestAPI.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { openModal, closeModal } = testSlice.actions;

export const selectTestList = (state: RootState) => state.test.testList;
export const selectIsLoading = (state: RootState) => state.test.isLoading;
export const selectError = (state: RootState) => state.test.error;
export const selectIsOpenModal = (state: RootState) => state.test.isOpenModal;
export const selectIsSubmitted = (state: RootState) => state.test.isSubmitted;

export default testSlice.reducer;
