import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  attempts: [] as any[],
};

const attemptsSlice = createSlice({
  name: "attempt",
  initialState,
  reducers: {

    setAttempts: (state, action) => {
      state.attempts = action.payload;
    },

    addAttempt: (state, {payload: attempt}) => {
      state.attempts = [...state.attempts, attempt];
    },

  },
});

export const { setAttempts, addAttempt } = attemptsSlice.actions;
export default attemptsSlice.reducer;