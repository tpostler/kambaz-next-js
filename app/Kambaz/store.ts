import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./Courses/reducer";
import modulesReducer from "./Courses/[cid]/Modules/reducer";
import accountReducer from "./Account/reducer";
import assignmentReducer from "./Courses/[cid]/Assignments/reducer";
import enrollmentReducer from "./Dashboard/reducer";
import quizzesReducer from "./Courses/[cid]/Quizzes/reducer";
import questionReducer from "./Courses/[cid]/Quizzes/questionReducer";
import attemptsReducer from "./Courses/[cid]/Quizzes/attemptsReducer";

const store = configureStore({
 reducer: { 
    coursesReducer,
    modulesReducer,
    accountReducer,
    assignmentReducer,
    enrollmentReducer,
    quizzesReducer,
    questionReducer,
    attemptsReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;