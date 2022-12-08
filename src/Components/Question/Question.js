import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Question.css";
import "../AnswerList/AnswerList.css";
import AnswersList from "../AnswerList/AnswerList";
import { useDispatch, useSelector } from "react-redux";
import { setQuestion } from "../../features/questionSlice";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function Question() {
  let { questionId } = useParams();
  const votingIconStyle = {
    fontSize: "60px",
    color: "grey",
  };
  const token = localStorage.getItem("token");
  const question = useSelector((state) => state.question.value);
  const dispatch = useDispatch();
  const [answer, setAnswer] = useState("");
  const [questionStatus, setQuestionStatus] = useState(false);
  const navigateTo = useNavigate();
  const user = useSelector((state) => state.user.value);
  const userId = user["_id"];
  const userName = user["name"];
  const userEmail = user["email"];
  const [toggle, setToggle] = useState(true);

  async function handleUpVote() {
    try {
       await axios.post(
        "https://cloneoverflow.onrender.com/questions/upvote",
        {
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
      setToggle(!toggle);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDownVote() {
    try {
      const response = await axios.post(
        "https://cloneoverflow.onrender.com/questions/downvote",
        {
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
      setToggle(!toggle);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      if (question) {
        const response = await axios.post(
          "https://cloneoverflow.onrender.com/answers/create-answer",
          {
            answer,
            user: userId,
            userName,
            userEmail,
            question: question["_id"],
            date: new Date(),
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
          window.location.reload();
        }
      }
    } catch (error) {
      alert("enter answer correctly");
    }
  }

  useEffect(() => {
    getQuestionDetails();
  }, [toggle]);

  async function getQuestionDetails() {
    try {
      const response = await axios.post(
        "https://cloneoverflow.onrender.com/questions/" + questionId,
        {
          user: userId,
        },
        {
          headers: {
            "access-token": token,
          },
        }
      );
      dispatch(setQuestion(response.data.question));
      setTimeout(()=>{
        setQuestionStatus(true);
      },1000);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <ArrowCircleLeftIcon
        style={{
          marginLeft: "10%",
          fontSize: "40px",
        }}
        onClick={() => {
          navigateTo(-1);
        }}
      />
      {!questionStatus && (<h1>Loading....</h1>)}
      {questionStatus && (
        <div className="container mt-5">
          <div className="row question-details">
            <div className="col-1 options d-flex flex-column align-items-center justify-content-center">
              <ArrowDropUpIcon
                style={votingIconStyle}
                onClick={() => {
                  handleUpVote();
                }}
              />
              <h3
                style={{
                  margin: "0px",
                }}
              >
                {question.votes.length}
              </h3>
              <ArrowDropDownIcon
                style={votingIconStyle}
                onClick={() => {
                  handleDownVote();
                }}
              />
            </div>
            <div className="col-11">
              <h2>{question.title}</h2>
              <h6>description</h6>
              <p>{question.description}</p>
              <div
                style={{
                  display: "flex",
                  marginBottom: "5px",
                  wordWrap: "break-word",
                }}
              >
                {question.tags.map((tag) => (
                  <div className="tag" onClick={()=>{
                    navigateTo("/question-results/"+tag);
                  }}>{tag}</div>
                ))}
              </div>
              <p
                style={{
                  display: "inline-block",
                  marginLeft: "60%",
                }}
              >
                <small>asked by </small>
                &nbsp;{question.userName}&nbsp;
                <small>on {new Date(question.date).toLocaleDateString()}</small>
              </p>
            </div>
          </div>
          <h2>Your Answer</h2>
          <div className="row answer-form">
            <div className="col-12 col-md-10 ms-auto">
              <form
                onSubmit={(event) => {
                  handleSubmit(event);
                }}
              >
                <div
                  className="form-floating mb-3"
                  style={{
                    height: "250px",
                  }}
                >
                  <ReactQuill
                    theme="snow"
                    value={answer}
                    onChange={setAnswer}
                    style={{
                      height: "200px",
                    }}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Post Answer
                </button>
              </form>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <br />
              <h3>Answers</h3>
              <AnswersList question={question} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Question;
