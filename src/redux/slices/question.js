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
  "userResult/getUserResult",
  async (payload) => {
    try {
      const { testId, type } = payload;
      console.log("Get: ", testId, type);
      const response = await axios.get(
        `http://localhost:3001/userResults/65641bc12971970f5e1918cc/${testId}/${type}`
      );
      let data = response.data;
      if (!data) {
        const newResponse = await createNewUserResultAPI(testId, type);
        data = newResponse.payload;
      }
      return data;
    } catch (error) {
      throw new Error("Failed to fetch user result data from API");
    }
  }
);

export const createNewUserResultAPI = createAsyncThunk(
  "userResult/createUserResult",
  async (payload) => {
    try {
      const { testId, type } = payload;
      console.log("Create: ", testId, type);
      const response = await axios.post(
        `http://localhost:3001/userResults/65641bc12971970f5e1918cc/${testId}/${type}`
      );
      let data = response.data;
      return data;
    } catch (error) {
      throw new Error("Failed to fetch question data from API");
    }
  }
);

export const updateUserResultAPI = async (
  userResultId,
  answers,
  isSubmitted,
  score
) => {
  try {
    const response = await axios.put(
      `http://localhost:3001/userResults/${userResultId}`,
      { answers, isSubmitted, score }
    );

    if (response.status === 200) {
      const data = response.data;
      return data;
    } else {
      throw new Error(
        `Failed to update user result. Status: ${response.status}`
      );
    }
  } catch (error) {
    console.error("Error updating user result:", error.message);
    throw new Error("Failed to update user result. Please try again.");
  }
};

const questionSlice = createSlice({
  name: "question",
  initialState: {
    id: null,
    userAnswer: [],
    currentQuestion: null,
    numberQuestion: 0,
    type: "practice",
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
      if (state.type == "practice") {
        resetUserAnswer(state.userAnswer);
        updateUserResultAPI(
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

      updateUserResultAPI(
        state.id,
        state.userAnswer,
        state.isSubmitted,
        state.score
      );
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
      state.isSubmitted = true;
      state.isOpenModal = false;
      state.currentQuestion = null;
      submitUserAnswer(state.userAnswer);
      updateUserResultAPI(
        state.id,
        state.userAnswer,
        state.isSubmitted,
        state.score
      );
    },

    submitQuestion(state, action) {
      const currentQuestion = state.userAnswer[state.currentQuestion];
      if (currentQuestion.question.question_type == "input") {
        const answer = action.payload;
        console.log(answer.answer);
        state.userAnswer[state.currentQuestion].answer = answer.answer;
      }
      if (state.type == "practice")
        state.userAnswer[state.currentQuestion].showAnswer = true;
      updateUserResultAPI(
        state.id,
        state.userAnswer,
        state.isSubmitted,
        state.score
      );
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
        console.log(userResult);
        state.id = userResult._id;
        state.userAnswer = userResult.answers;
        state.numberQuestion = state.userAnswer.length;
        state.isSubmitted = userResult.isSubmitted;
        state.score = userResult.score;
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
        console.log(userResult);
        state.id = userResult._id;
        state.userAnswer = userResult.answers;
        state.numberQuestion = state.userAnswer.length;
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
