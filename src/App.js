import "./App.css";
import Navigation from "./Components/Header/Navigation";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Components/Home/Home";
import Login from "./Components/Login-Signup/Login";
import Signup from "./Components/Login-Signup/Signup";
import AskQuestion from "./Components/AskQuestion/AskQuestion";
import Profile from "./Components/Profile/Profile";
import Question from "./Components/Question/Question";
import QuestionResults from "./Components/QuestionResults/QuestionResults";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import EditProfile from "./Components/Profile/EditProfile";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageNotFound from "./Components/404/PageNotFound";

function App() {
  return (
    <div className="App">
      <ToastContainer/>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword/>} />
        <Route path="/ask-question" element={<AskQuestion />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/questions/:questionId" element={<Question />} />
        <Route path="/question-results/:tag" element = {<QuestionResults/> }/>
        <Route path="/404" element={<PageNotFound />} />      
        <Route path="*" element={<Navigate replace to="/404" />} />
      </Routes>
    </div>
  );
}

export default App;
