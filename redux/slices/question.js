// slices/questionSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllQuestionsAPI = createAsyncThunk(
  "question/getQuestions",
  async (testId) => {
    try {
      console.log(testId);
      const response = await axios.get(`http://localhost:3001/tests/${testId}`);
      const data = response.data;
      const questions = data.test.questions;
      return questions;
    } catch (error) {
      throw new Error("Failed to fetch question data from API");
    }
  }
);

const questionSlice = createSlice({
  name: "question",
  initialState: {
    questionList: [],
    userAnswer: [],
    showAnswer: [],
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
    nextQuestion(state) {
      state.currentQuestion++;
      if (state.currentQuestion == state.numberQuestion)
        state.isOpenModal = true;
    },

    preQuestion(state) {
      state.currentQuestion--;
    },

    startGame(state) {
      state.currentQuestion = 0;
      state.isSubmitted = false;
      state.userAnswer = Array(state.questionList.length).fill([]);
    },

    answerCorrect(state) {
      state.score++;
    },

    chooseMutilOption(state, action) {
      const answer = action.payload;
      const index = state.userAnswer[state.currentQuestion].findIndex(
        (element) => element.option == answer.option
      );
      if (index !== -1)
        state.userAnswer[state.currentQuestion].splice(index, 1);
      else state.userAnswer[state.currentQuestion].push(answer);
    },

    chooseOption(state, action) {
      state.userAnswer[state.currentQuestion] = action.payload;
    },

    chooseQuestion(state, action) {
      state.currentQuestion = action.payload;
    },

    changeTab(state, action) {
      state.type = action.payload;
      state.currentQuestion = null;
      state.isSubmitted = false;
      state.userAnswer = Array(state.questionList.length).fill([]);
    },

    submit(state, action) {
      state.isSubmitted = true;
      state.isOpenModal = false;
      state.currentQuestion = null;
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
      .addCase(getAllQuestionsAPI.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllQuestionsAPI.fulfilled, (state, action) => {
        state.isLoading = false;
        state.questionList = action.payload;
        state.numberQuestion = state.questionList.length;
        state.userAnswer = Array(state.questionList.length).fill([]);
      })
      .addCase(getAllQuestionsAPI.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  openModal,
  closeModal,
  nextQuestion,
  preQuestion,
  changeTab,
  chooseQuestion,
  answerCorrect,
  startGame,
  submit,
  submitQuestion,
  chooseOption,
  chooseMutilOption,
} = questionSlice.actions;

export const selectQuestionList = (state) => state.question.questionList;
export const selectCurrentQuestion = (state) => state.question.currentQuestion;
export const selectNumberQuestion = (state) => state.question.numberQuestion;
export const selectChoicedAnswer = (state) => state.question.userAnswer;
export const selectScore = (state) => state.question.score;
export const selectIsLoading = (state) => state.question.isLoading;
export const selectError = (state) => state.question.error;
export const selectIsOpenModal = (state) => state.question.isOpenModal;
export const selectIsSubmitted = (state) => state.question.isSubmitted;
export const selectType = (state) => state.question.type;

export default questionSlice.reducer;
