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
  const token = localStorage.getItem("token");
  async function getQuestions() {
    try {
      const response = await axios.get("http://localhost:8000/questions/get", {
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
  }, []);

  return (
    <div className="container">
      <h4>{questions.length} &nbsp; questions</h4>
      <div className="row">
      <div className="col-md-2 col-xs-0">
      </div>
      <div className="col-md-10 col-12">
        {!questions ? (
        <h1>Loading...</h1>
      ) : (
        questions.map((d, i) => <SingleQuestion key={i} d={d} />)
      )}
        </div>
      </div>
    </div>
  );
}

function SingleQuestion({ d }) {
  const navigateTo = useNavigate();

  return (
    <div className="question-container p-2">
      <div className="countables w-25 ms-auto text-end">
        <p>{d.votes.length} votes</p>
        <p>{d.answers.length} answers</p>
        <p>{d.views.length} views</p>
      </div>
      <div className="question-meta w-75 text-left ps-5">
        <h4
          onClick={() => {
            navigateTo("/questions/" + d["_id"]);
          }}
        >
          {d.title}
        </h4>
       <div style={{
        display:"flex",
        marginBottom: "5px",
        wordWrap:"break-word"
       }}>
        { d.tags.map((tag)=>(
          <div className="tag">
            {tag}
          </div>
        ))}
       </div>
        <p className="author-name" style={{
          marginLeft:"50%"
        }}><small>asked by &nbsp;</small>{d.userName} &nbsp;
        <small>on {new Date(d.date).toLocaleDateString()}</small></p>
      </div>
    </div>
  );
}

export default QuestionsList;
