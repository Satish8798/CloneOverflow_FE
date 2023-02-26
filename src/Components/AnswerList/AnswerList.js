import "./AnswerList.css";
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useSelector } from "react-redux";

function AnswersList({ question }) {
  const [answers, setAnswers] = useState([]);
  const votingIconStyle = {
    fontSize: "60px",
    color: "grey",
  };
  const [toggle,setToggle] = useState(true);
  const token = localStorage.getItem("token");
  const user = useSelector((state) => state.user.value);
  const userName = user["name"];
  const userEmail = user["email"];

  async function handleUpVote(answer){
    try {
      await axios.put(
        "https://cloneoverflow.onrender.com/answers/up-vote",
        {
          userName,
          userEmail,
          answer: answer["_id"],
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

  async function handleDownVote(answer){
    try {
     await axios.put(
        "https://cloneoverflow.onrender.com/answers/down-vote",
        {
          userName,
          userEmail,
          answer: answer["_id"],
        },
        {
          headers: {
            "access-token": token,
          },
        }
      );
      setToggle(!toggle)
      
    } catch (error) {
      console.error(error);
    }
  }

  async function getAnswers() {
    try {
      const response = await axios.post("https://cloneoverflow.onrender.com/answers/get", {
        question: question["_id"],
      });
      setAnswers(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAnswers();
  }, [toggle]);

  function createMarkup(d){
    return {__html: d.answer};
  }

  return (
    <div>
      {answers.length === 0 && <h6 className="mb-5 text-danger">No answers yet</h6>}
      {answers.map((d,index) => (
        <div className="answer-container p-2 ms-auto" key ={index}>
          <div className="countables w-25 ms-auto text-end">
            <ArrowDropUpIcon
              style={votingIconStyle}
              onClick={() => {
               handleUpVote(d);
              }}
            />
            <h3
              style={{
                margin: "0px",
              }}
            >
              {d.votes.length}
            </h3>
            <ArrowDropDownIcon style={votingIconStyle}
            onClick={() => {
              handleDownVote(d);
             }} />
          </div>
          <div className="answer-meta w-75 text-left ps-5">
            <p dangerouslySetInnerHTML={createMarkup(d)}/>
            <p
              className="author-name"
              style={{
                marginLeft: "50%",
              }}
            >
              <small>answered by &nbsp;</small>
              {d.userName} &nbsp;
              <small>on {new Date(d.date).toLocaleDateString()}</small>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AnswersList;
