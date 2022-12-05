import { createSlice } from "@reduxjs/toolkit";

const initialDetails = null;

const userSlice = createSlice({
  name: "user",
  initialState: {
    value: initialDetails,
  },
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload;
    },
    removeUser:(state, action) => {
        state.value = initialDetails;
      }
  },
});

export const {setUser,removeUser} = userSlice.actions;

export default userSlice.reducer;