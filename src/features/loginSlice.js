import { createSlice } from "@reduxjs/toolkit";

const initialStatus = false;

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
      state.value = initialStatus;
    },
  },
});

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;
