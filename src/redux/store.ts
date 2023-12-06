import { configureStore } from "@reduxjs/toolkit";
import testReducer from "./reducer/test";
import questionReducer from "./reducer/question/question";
import blogReducer from "./reducer/blog";
import userReducer from "./reducer/user";

const store = configureStore({
  reducer: {
    test: testReducer,
    question: questionReducer,
    blog: blogReducer,
    user: userReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
