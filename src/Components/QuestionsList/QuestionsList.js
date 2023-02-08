import React, { useEffect } from "react";
import axios from "axios";
import "./QuestionsList.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setQuestions } from "../../features/questionsSlice";
import CircularProgress from "@mui/material/CircularProgress";

function QuestionsList() {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questionsList.value);
  const token = localStorage.getItem("token");
  async function getQuestions() {
    try {
      const response = await axios.get(
        "https://cloneoverflow.onrender.com/questions/get",
        {
          headers: {
            "access-token": token,
          },
        }
      );
      setTimeout(() => {
        dispatch(setQuestions([...response.data.response]));
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <div className="container">
      <h4>{questions.length} &nbsp; questions</h4>
      <div className="row">
        <div className="col-md-2 col-xs-0"></div>
        <div className="col-md-10 col-12">
          {!questions.length ? (
            <CircularProgress />
          ) : (
            questions.map((d, i) => <SingleQuestion key={i} d={d} />)
          )}
        </div>
      </div>
    </div>
  );
}

export function SingleQuestion({ d }) {
  const navigateTo = useNavigate();
  const token = localStorage.getItem("user");
  return (
    <div className="question-container p-2 w-100">
      <div className="countables">
        <p>{d.votes.length} votes</p>
        <p>{d.answers.length} answers</p>
        <p>{d.views.length} views</p>
      </div>
      <div className="question-meta text-left">
        <p
          style={{ fontWeight: 600,cursor: "pointer", }}
          onClick={() => {
            if (token) {
              navigateTo("/questions/" + d["_id"]);
            } else {
              navigateTo("/login");
            }
          }}
        >
          {d.title}
        </p>
        <div
          style={{
            display: "flex",
            marginBottom: "5px",
            wordWrap: "break-word",
          }}
        >
          {d.tags.map((tag,index) => (
            <div
              className="tag"
              onClick={() => {
                navigateTo("/question-results/" + tag);
              }}
              key = {index}
            >
              {tag}
            </div>
          ))}
        </div>
        <p
          className="author-name"
          style={{
            marginLeft: "50%",
          }}
        >
          <small>asked by &nbsp;</small>
          {d.userName} &nbsp;
          <small>on {new Date(d.date).toLocaleDateString()}</small>
        </p>
      </div>
    </div>
  );
}

export default QuestionsList;
