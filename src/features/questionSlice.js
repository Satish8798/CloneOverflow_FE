
import { createSlice } from "@reduxjs/toolkit";

const initialList = null;

const questionSlice = createSlice({
  name: "question",
  initialState: {
    value: initialList,
  },
  reducers: {
    setQuestion: (state, action) => {
      state.value = action.payload;
    }
  },
});

export const {setQuestion} = questionSlice.actions;

export default questionSlice.reducer;
