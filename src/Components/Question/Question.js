import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Question.css";
import "../AnswerList/AnswerList.css";
import AnswersList from "../AnswerList/AnswerList";
import { useSelector } from "react-redux";

function Question() {
  let { questionId } = useParams();

  const token = localStorage.getItem("token");

    const [question,setQuestion] = useState(null);

  const [answer, setAnswer] = useState("");
  const [questionStatus, setQuestionStatus] = useState(false);

  const user= useSelector((state)=>state.user.value)

  const userId = user["_id"];
  const userName = user["name"];
  const userEmail = user["email"];

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/answers/create-answer",
        {
          answer,
          user: userId,
          userName,
          userEmail,
          question: question["_id"],
        },
        {
          headers: {
            "access-token": token,
          },
        }
      );
      if (response.data.msg) {
        setAnswer("");
        alert("answer added succesfully");
      }
    } catch (error) {
      alert("enter answer correctly");
    }
  }

  useEffect(() => {
    getQuestionDetails();
  }, []);

  async function getQuestionDetails() {
    try {
      console.log("questiondeails func");
      const response = await axios.get(
        "http://localhost:8000/questions/" + questionId,
        {
          headers: {
            "access-token": token,
          },
        }
      );
      setQuestion(response.data.question);
      setQuestionStatus(true);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {
        !questionStatus && <h1>Loading...</h1>
      }
      {
        questionStatus && 
        (
          <div className="container mt-5">
      <div className="row question-details">
        <div className="col-12">
          <h2>{question.title}</h2>
          <h6>description</h6>
          <p>{question.description}</p>
           <p className="tags">
            <span>
              <i className="bi bi-tags"></i>
            </span>
            &nbsp;<span>{question.tags.map((tag)=>(
                <span>{tag},</span>
            ))}</span>
          </p>  
          <p>
            <span>
              <i className="bi bi-person"></i>
            </span>
            &nbsp;{question.userName}
          </p>
        </div>
      </div>
      <div className="row answer-form">
        <form
          onSubmit={(event) => {
            handleSubmit(event);
          }}
        >
          <div className="form-floating mb-3">
            <textarea
              className="form-control"
              placeholder="Leave a comment here"
              id="floatingTextarea2"
              style={{
                height: "100px",
              }}
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
              }}
            ></textarea>
            <label for="floatingTextarea2">your answer</label>
          </div>
          <button type="submit" className="btn btn-primary">
            Post Answer
          </button>
        </form>
      </div>
      <div className="row">
        <div className="col-12">
          <br />
          <h3>Answers</h3>
          <AnswersList question={question}/>
        </div>
      </div>
    </div>
        )
      }
    </div>
  );
}

export default Question;
