// slices/questionSlice.js
import {
  checkSufficientQuestions,
  chooseOptionFuntion,
  resetUserAnswer,
  submitUserAnswer,
} from "utils/question";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { QuestionState } from "types/question";
import {
  createNewUserResultAPI,
  getUserResultAPI,
  updateUserResult,
} from "./userResultAPI";
import { RootState } from "redux/store";

const initialState: QuestionState = {
  id: null,
  userAnswer: null,
  currentQuestion: null,
  type: "practice",
  score: 0,
  isLoading: false,
  error: undefined,
  isSubmitted: false,
  isOpenModal: false,
};

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    startGame(state) {
      state.currentQuestion = 0;
    },

    restartGame(state, action) {
      if (
        state.type == "practice" &&
        state.userAnswer != null &&
        state.id != null
      ) {
        resetUserAnswer(state.userAnswer);
        updateUserResult(
          state.id,
          state.userAnswer,
          state.isSubmitted,
          state.score
        );
      }
      state.currentQuestion = 0;
    },

    calculateScore(state) {
      state.score++;
    },

    chooseOption(state, action) {
      // Kiểm tra nếu state.userAnswer không phải là null
      if (state.userAnswer && state.id && state.currentQuestion) {
        const optionId = action.payload;
        const currentQuestion = state.userAnswer[state.currentQuestion];

        switch (currentQuestion.question.question_type) {
          case "choice":
            currentQuestion.options = chooseOptionFuntion(
              currentQuestion.options,
              optionId
            );
            if (state.type === "practice") {
              currentQuestion.showAnswer = true;
            }
            break;
          case "multiple_choice":
            currentQuestion.options = chooseOptionFuntion(
              currentQuestion.options,
              optionId,
              true
            );
            if (state.type === "practice") {
              currentQuestion.showAnswer = checkSufficientQuestions(
                currentQuestion.options
              );
            }
            break;
          case "multiple_answer":
            currentQuestion.options = chooseOptionFuntion(
              currentQuestion.options,
              optionId,
              true
            );
            break;
          default:
            break;
        }

        // Thực hiện cập nhật API ở đây
        updateUserResult(
          state.id,
          state.userAnswer,
          state.isSubmitted,
          state.score
        );
      }
    },

    chooseQuestion(state, action) {
      state.currentQuestion = action.payload;
    },

    changeTab(state, action) {
      const { testId, type } = action.payload;
      state.type = type;
      state.currentQuestion = null;
    },

    submit(state, action) {
      if (state.userAnswer && state.id) {
        state.isSubmitted = true;
        state.isOpenModal = false;
        state.currentQuestion = null;
        submitUserAnswer(state.userAnswer);
        updateUserResult(
          state.id,
          state.userAnswer,
          state.isSubmitted,
          state.score
        );
      }
    },

    submitQuestion(state, action) {
      if (state.userAnswer && state.id && state.currentQuestion) {
        const currentQuestion = state.userAnswer[state.currentQuestion];
        if (currentQuestion.question.question_type == "input") {
          const answer = action.payload;
          console.log(answer.answer);
          state.userAnswer[state.currentQuestion].answer = answer.answer;
        }
        if (state.type == "practice")
          state.userAnswer[state.currentQuestion].showAnswer = true;
        updateUserResult(
          state.id,
          state.userAnswer,
          state.isSubmitted,
          state.score
        );
      }
    },

    openModal(state, action) {
      state.isOpenModal = true;
    },
    closeModal(state) {
      state.isOpenModal = false;
      state.currentQuestion = null;
      state.score = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserResultAPI.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(getUserResultAPI.fulfilled, (state, action) => {
        state.isLoading = false;
        const userResult = action.payload;
        console.log(userResult);
        state.id = userResult._id;
        state.userAnswer = userResult.answers;
        state.isSubmitted = userResult.isSubmitted;
        state.score = userResult.score;
      })
      .addCase(getUserResultAPI.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(createNewUserResultAPI.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(createNewUserResultAPI.fulfilled, (state, action) => {
        state.isLoading = false;
        const userResult = action.payload;
        console.log(userResult);
        state.id = userResult._id;
        state.userAnswer = userResult.answers;
        state.isSubmitted = userResult.isSubmitted;
        state.score = userResult.score;
      })
      .addCase(createNewUserResultAPI.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  openModal,
  closeModal,
  changeTab,
  chooseQuestion,
  calculateScore,
  startGame,
  restartGame,
  submit,
  submitQuestion,
  chooseOption,
} = questionSlice.actions;

export const selectCurrentQuestion = (state: RootState) =>
  state.question.currentQuestion;
export const selectUserAnswer = (state: RootState) => state.question.userAnswer;
export const selectScore = (state: RootState) => state.question.score;
export const selectIsLoading = (state: RootState) => state.question.isLoading;
export const selectError = (state: RootState) => state.question.error;
export const selectIsOpenModal = (state: RootState) =>
  state.question.isOpenModal;
export const selectIsSubmitted = (state: RootState) =>
  state.question.isSubmitted;
export const selectType = (state: RootState) => state.question.type;

export default questionSlice.reducer;
