import { createSlice } from "@reduxjs/toolkit";

let initialStatus = false;
if(localStorage.getItem("token")){
  initialStatus=true
}

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

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;
