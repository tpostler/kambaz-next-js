import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "../Database";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  enrollments: enrollments,
};

// I think i will be able to update this after when I get a clearer picture
const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enrollStudent: (state, {payload: { course, userID } }) => {
        const newEnrollment = {_id: uuidv4(), user: userID, course: course}
        state.enrollments = [...state.enrollments, newEnrollment] as any;
    },
    
    unenrollStudent: (state, {payload: { course, userID } }) => {
        state.enrollments = state.enrollments.filter((e: any) => 
            (e.user !== userID) || (e.course !== course)) ;
    },
  },
});
export const { enrollStudent, unenrollStudent,} =
  enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;