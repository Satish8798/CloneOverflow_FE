import { createSlice } from "@reduxjs/toolkit";
/* Creating a slice for storing login status state */

//initializing default value
let initialStatus = false;
if(localStorage.getItem("token")){
  initialStatus=true
}

//creating a slice
const loginSlice = createSlice({
  name: "login",
  initialState: {
    value: initialStatus,
  },
  reducers: {
    login: (state, action) => {
      state.value = true;
    },
    logout: (state, action) => {
      state.value = false;
    },
  },
});

//exporting the actions and reducer
export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;
