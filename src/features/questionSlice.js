
import { createSlice } from "@reduxjs/toolkit";
/* creating a slice for storing a Question state */

//initializing default value
const initialList = null;

//creating a slice
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

//exporting the actions and reducer
export const {setQuestion} = questionSlice.actions;

export default questionSlice.reducer;
