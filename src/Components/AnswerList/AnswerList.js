import "./AnswerList.css";
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

function AnswersList({ question }) {

  const [answers, setAnswers] = useState([]);
  const votingIconStyle={
    fontSize:"60px",
    color:"grey",
}

  async function getAnswers() {
    try {
      const response = await axios.post("http://localhost:8000/answers/get", {
        question: question["_id"],
      });
      setAnswers(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAnswers();
  }, []);

  return (
    <div>
      {answers.map((d) => (
        <div className="answer-container p-2 ms-auto">
          <div className="countables w-25 ms-auto text-end">
          <ArrowDropUpIcon style={votingIconStyle} onClick={()=>{
                  console.log("hi")
                }}/>
                <h3 style={{
                  margin:"0px"
                }}>{question.votes.length}</h3>
                <ArrowDropDownIcon style={votingIconStyle}/>
          </div>
          <div className="answer-meta w-75 text-left ps-5">
            <p>{d.answer}</p>
            <p className="author-name" style={{
          marginLeft:"50%"
        }}><small>asked by &nbsp;</small>{d.userName} &nbsp;
        <small>on {new Date(d.date).toLocaleDateString()}</small></p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AnswersList;
