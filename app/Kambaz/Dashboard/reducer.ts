import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  enrollments: [],
};


const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollment: (state, action) => {
      state.enrollments = action.payload;
    },
    enrollStudent: (state, { payload: { course, userID } }) => {
      const newEnrollment = { _id: uuidv4(), user: userID, course: course };
      state.enrollments = [...state.enrollments, newEnrollment] as any;
    },

    unenrollStudent: (state, { payload: { course, userID } }) => {
      state.enrollments = state.enrollments.filter(
        (e: any) => e.user !== userID || e.course !== course
      );
    },
  },
});
export const { enrollStudent, unenrollStudent, setEnrollment } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
