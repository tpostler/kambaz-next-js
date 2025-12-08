import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    questions: [] as any[],
};

const questionSlice = createSlice({
    name: "question",
    
    initialState,

    reducers: {
        setQuestion: (state, action) => {
            state.questions = action.payload;
        },
        addQuestion: (state, {payload: question}) => {
            state.questions = [...state.questions, question];
        },
        updateQuestion: (state, {payload: question}) => {
            state.questions = state.questions.map((q: any) =>
            q._id === question._id ? question : q);
        },
        deleteQuestion: (state, {payload: questionId}) => {
            state.questions = state.questions.filter((q:any) => 
                q._id !== questionId
            );
        },
    },
});

export const { setQuestion, addQuestion, updateQuestion, deleteQuestion } = questionSlice.actions;
export default questionSlice.reducer;
