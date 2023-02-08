import { createSlice } from "@reduxjs/toolkit";

//initializing default value
const initialList = [];

//creating a slice
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

//exporting the actions and reducer
export const {setQuestions} = questionsSlice.actions;

export default questionsSlice.reducer;
