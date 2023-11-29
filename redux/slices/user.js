// slices/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUsersAPI = createAsyncThunk("user/getUsers", async () => {
  try {
    const response = await axios.get(
      "https://653b1ca02e42fd0d54d4b3b0.mockapi.io/users"
    );
    return response.data.sort((a, b) => b.highScore - a.highScore);
    // return response.data;
  } catch (error) {
    throw new Error("Failed to fetch user data from API");
  }
});

export const createUserAPI = createAsyncThunk(
  "user/createUser",
  async (userData) => {
    try {
      const response = await axios.post(
        "https://653b1ca02e42fd0d54d4b3b0.mockapi.io/users",
        userData
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to create a new user");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    userList: [],
    isLoading: false,
    error: null,
    isOpenDrawer: false,
  },
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    openDrawer(state, action) {
      state.isOpenDrawer = true;
    },
    closeDrawer(state) {
      state.isOpenDrawer = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersAPI.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUsersAPI.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userList = action.payload;
        state.numberUser = state.userList.length;
      })
      .addCase(getUsersAPI.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(createUserAPI.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action);
        state.userList.push(action.payload);
        state.numberUser = state.userList.length;
      })
      .addCase(createUserAPI.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { openDrawer, closeDrawer } = userSlice.actions;

export const selectUserList = (state) => state.user.userList;
export const selectIsLoading = (state) => state.user.isLoading;
export const selectError = (state) => state.user.error;
export const selectIsOpenDrawer = (state) => state.user.isOpenDrawer;

export default userSlice.reducer;
