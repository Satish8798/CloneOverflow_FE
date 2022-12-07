import "./App.css";
import Navigation from "./Components/Header/Navigation";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Login from "./Components/Login-Signup/Login";
import Signup from "./Components/Login-Signup/Signup";
import AskQuestion from "./Components/AskQuestion/AskQuestion";
import Profile from "./Components/Profile/Profile";
import Question from "./Components/Question/Question";
import QuestionResults from "./Components/QuestionResults/QuestionResults";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ask-question" element={<AskQuestion />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/questions/:questionId" element={<Question />} />
        <Route path="/question-results/:tag" element = {<QuestionResults/> }/>
      </Routes>
    </div>
  );
}

export default App;
