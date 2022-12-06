import {configureStore} from '@reduxjs/toolkit';
import loginReducer from './features/loginSlice';
import questionsReducer from './features/questionsSlice';
import userReducer from './features/userSlice';
import questionSlice from './features/questionSlice'


export const store= configureStore({
    reducer:{
      login: loginReducer,
      questionsList: questionsReducer,
      user: userReducer,
      question: questionSlice
    }
  });