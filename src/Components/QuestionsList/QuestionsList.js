import React, { useEffect, useContext } from "react";
import axios from "axios";
/* import { dataContext } from "../Context/Context";
 */ import "./QuestionsList.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setQuestions } from "../../features/questionsSlice";

function QuestionsList() {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questionsList.value);
  const navigateTo = useNavigate();
  const token = localStorage.getItem("token");
  async function getQuestions() {
    try {
      const response = await axios.get("http://localhost:8001/questions/get", {
        headers: {
          "access-token": token,
        },
      });
      dispatch(setQuestions([...response.data.response]));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getQuestions();
    console.log(questions);
  }, []);

  return (
    <div className="container">
      {!questions ? (
        <h1>Loading...</h1>
      ) : (
        questions.map((d, i) => (
          <div className="question-container p-2">
            <div className="countables w-25 ms-auto text-end">
              <p>{d.votes} votes</p>
              <p>{d.answers.length} answers</p>
              <p>{d.views} views</p>
            </div>
            <div className="question-meta w-75 text-left ps-5">
              <h4
                onClick={() => {
                  navigateTo("/questions/" + d["_id"]);
                }}
              >
                {d.title}
              </h4>
              <p>{d.userName}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default QuestionsList;
