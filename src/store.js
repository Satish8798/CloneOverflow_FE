import {configureStore} from '@reduxjs/toolkit';
import loginReducer from './features/loginSlice';
import questionsReducer from './features/questionsSlice';
import userReducer from './features/userSlice';


export const store= configureStore({
    reducer:{
      login: loginReducer,
      questionsList: questionsReducer,
      user: userReducer
    }
  });