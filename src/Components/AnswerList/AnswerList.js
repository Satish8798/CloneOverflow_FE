import "./AnswerList.css";
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";

function AnswersList({ question }) {

  const [answers, setAnswers] = useState([]);

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
      {" "}
      {answers.map((d) => (
        <div className="answer-container p-2">
          <div className="countables w-25 ms-auto text-end">
            <p>{d.votes} votes</p>
          </div>
          <div className="answer-meta w-75 text-left ps-5">
            <h4>{d.answer}</h4>
            <p>{d.userName}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AnswersList;
