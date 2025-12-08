import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizzes: [] as any[],
};

const quizzesSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {

    setQuiz: (state, action) => {
      state.quizzes = action.payload;
    },

    addQuiz: (state, {payload: quiz}) => {
      state.quizzes = [...state.quizzes, quiz];
    },

    deleteQuiz: (state, {payload: quizId}) => {
      state.quizzes = state.quizzes.filter((q: any) => q._id !== quizId);
    },

    updateQuiz: (state, { payload: quiz }) => {
      state.quizzes = state.quizzes.map((q: any) =>
      q._id === quiz._id ? quiz : q );
    },
  },
});

export const { setQuiz, addQuiz, deleteQuiz, updateQuiz } = quizzesSlice.actions;
export default quizzesSlice.reducer;
