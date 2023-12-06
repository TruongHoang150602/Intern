// userResultAPI.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { GET, POST, PUT } from "utils/url";

export const getUserResult = async (
  userId: string,
  testId: string,
  type: "practice" | "test"
): Promise<any> => {
  try {
    const response = await GET({
      url: `/userResults/${userId}/${testId}/${type}`,
    });
    return response;
  } catch (error) {
    throw new Error("Failed to fetch user result data from API");
  }
};

export const createNewUserResult = async (
  userId: string,
  testId: string,
  type: "practice" | "test"
): Promise<any> => {
  try {
    const response = await POST({
      url: `/userResults/${userId}/${testId}/${type}`,
    });
    return response;
  } catch (error) {
    throw new Error("Failed to fetch test data from API");
  }
};

export const updateUserResult = async (
  userResultId: string,
  answers: any,
  isSubmitted: boolean,
  score: number
): Promise<any> => {
  try {
    const response = await PUT({
      url: `/userResults/${userResultId}`,
      params: { answers, isSubmitted, score },
    });
    return response;
  } catch (error) {
    throw new Error("Failed to update user result data");
  }
};

export const getUserResultAPI = createAsyncThunk(
  "userResult/getUserResult",
  async (
    {
      userId,
      testId,
      type,
    }: { userId: string; testId: string; type: "practice" | "test" },
    { rejectWithValue }
  ) => {
    try {
      const response = await getUserResult(userId, testId, type);

      if (!response) {
        const newResponse = await createNewUserResult(userId, testId, type);
        return newResponse;
      }

      return response;
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue("Unknown error");
    }
  }
);

export const createNewUserResultAPI = createAsyncThunk(
  "userResult/createUserResult",
  async (
    {
      userId,
      testId,
      type,
    }: { userId: string; testId: string; type: "practice" | "test" },
    { rejectWithValue }
  ) => {
    try {
      const response = await createNewUserResult(userId, testId, type);
      return response;
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue("Unknown error");
    }
  }
);
