import { createSlice } from "@reduxjs/toolkit";

const initialList = [];

const questionsSlice = createSlice({
  name: "questionsList",
  initialState: {
    value: initialList,
  },
  reducers: {
    setQuestions: (state, action) => {
      state.value = action.payload;
    }
  },
});

export const {setQuestions} = questionsSlice.actions;

export default questionsSlice.reducer;
