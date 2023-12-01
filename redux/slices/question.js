// slices/questionSlice.js
import {
  checkSufficientQuestions,
  chooseOptionFuntion,
  resetUserAnswer,
  submitUserAnswer,
} from "@/helpper/question";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserResultAPI = createAsyncThunk(
  "question/getQuestions",
  async (testId, type) => {
    try {
      console.log(testId, type);
      const response = await axios.get(
        `http://localhost:3001/userResults/65641bc12971970f5e1918cc/${testId}/${type}`
      );
      const data = response.data;
      if (!data) createNewUserResultAPI(testId, type);
      return data;
    } catch (error) {
      throw new Error("Failed to fetch question data from API");
    }
  }
);

export const createNewUserResultAPI = createAsyncThunk(
  "question/getQuestions",
  async (testId, type) => {
    try {
      console.log(testId, type);
      const response = await axios.post(
        `http://localhost:3001/userResults/65641bc12971970f5e1918cc/${testId}/${type}`
      );
      const data = response.data;
      return data;
    } catch (error) {
      throw new Error("Failed to fetch question data from API");
    }
  }
);

const questionSlice = createSlice({
  name: "question",
  initialState: {
    userAnswer: [],
    currentQuestion: null,
    numberQuestion: 0,
    type: 0,
    score: 0,
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

    startGame(state) {
      state.currentQuestion = 0;
    },

    restartGame(state, action) {
      state.currentQuestion = 0;
      resetUserAnswer(state.userAnswer);
    },

    calculateScore(state) {
      state.score++;
    },

    chooseOption(state, action) {
      const optionId = action.payload;
      switch (state.userAnswer[state.currentQuestion].question_type) {
        case "choice":
          chooseOptionFuntion(
            state.userAnswer[state.currentQuestion].options,
            optionId
          );
          if (type == "practice")
            state.userAnswer[state.currentQuestion].showAnswer = true;
          break;
        case "multiple_choice":
          chooseOptionFuntion(
            state.userAnswer[state.currentQuestion].answer.options,
            optionId,
            true
          );
          if (type == "practice")
            state.userAnswer[state.currentQuestion].showAnswer =
              checkSufficientQuestions(
                state.userAnswer[state.currentQuestion].options
              );
          break;
        case "multiple_answer":
          chooseOptionFuntion(
            state.userAnswer[state.currentQuestion].answer.options,
            optionId,
            true
          );
          break;
        default:
          break;
      }
      console.log(state.userAnswer[state.currentQuestion].answer.options);
    },

    chooseQuestion(state, action) {
      state.currentQuestion = action.payload;
    },

    changeTab(state, action) {
      const { testId, type } = action.payload;
      getUserResultAPI(testId, type);
    },

    submit(state, action) {
      state.isSubmitted = true;
      state.isOpenModal = false;
      state.currentQuestion = null;
      submitUserAnswer(state.userAnswer);
    },

    submitQuestion(state, action) {
      const answer = action.payload.answer;
      console.log(answer);
      const check = state.questionList[state.currentQuestion].options.find(
        (option) => option.option_text.toLowerCase() == answer.toLowerCase()
      );
      state.userAnswer[state.currentQuestion] = [
        {
          option: answer,
          is_correct: check != undefined,
        },
      ];
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
        state.error = null;
      })
      .addCase(getUserResultAPI.fulfilled, (state, action) => {
        state.isLoading = false;
        const userResult = action.payload;
        state.userAnswer = userResult.answers;
        state.numberQuestion = state.userAnswer.length;
      })
      .addCase(getUserResultAPI.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(createNewUserResultAPI.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createNewUserResultAPI.fulfilled, (state, action) => {
        state.isLoading = false;
        const userResult = action.payload;
        state.userAnswer = userResult.answers;
        state.numberQuestion = state.userAnswer.length;
        state.isSubmitted = userResult.isSubmitted;
      })
      .addCase(createNewUserResultAPI.pending, (state) => {
        state.isLoading = true;
        state.error = null;
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
  submit,
  submitQuestion,
  chooseOption,
} = questionSlice.actions;

export const selectCurrentQuestion = (state) => state.question.currentQuestion;
export const selectNumberQuestion = (state) => state.question.numberQuestion;
export const selectUserAnswer = (state) => state.question.userAnswer;
export const selectScore = (state) => state.question.score;
export const selectIsLoading = (state) => state.question.isLoading;
export const selectError = (state) => state.question.error;
export const selectIsOpenModal = (state) => state.question.isOpenModal;
export const selectIsSubmitted = (state) => state.question.isSubmitted;
export const selectType = (state) => state.question.type;

export default questionSlice.reducer;
