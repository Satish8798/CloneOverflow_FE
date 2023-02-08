import { createSlice } from "@reduxjs/toolkit";

//initializing default value
let initialDetails=null
if(localStorage.getItem("user")){
   initialDetails =JSON.parse( localStorage.getItem("user"));
}

//creating a slice
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

//exporting the actions and reducer
export const {setUser,removeUser} = userSlice.actions;

export default userSlice.reducer;