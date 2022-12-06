import { createSlice } from "@reduxjs/toolkit";

let initialDetails=null
if(localStorage.getItem("user")){
   initialDetails =JSON.parse( localStorage.getItem("user"));
}

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
        state.value = null;
      }
  },
});

export const {setUser,removeUser} = userSlice.actions;

export default userSlice.reducer;