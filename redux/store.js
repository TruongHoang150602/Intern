import { configureStore } from "@reduxjs/toolkit";
import testReducer from "./slices/test";
import questionReducer from "./slices/question";
import blogReducer from "./slices/blog";
import userReducer from "./slices/user";

const store = configureStore({
  reducer: {
    test: testReducer,
    question: questionReducer,
    blog: blogReducer,
    user: userReducer,
  },
});

export default store;
