import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import DeleteIcon from "@mui/icons-material/Delete";

function UserQuestionsList() {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const user = useSelector((state) => state.user.value);
  const [userQuestions, setUSerQuestions] = useState([]);
  const [renderToggle, setRenderToggle] = useState(false);
  const token = localStorage.getItem("token");

  async function getUserQuestions() {
    try {
      const response = await axios.get(
        "https://cloneoverflow.onrender.com/user/questions/" + user["_id"]
        /* {
          headers: {
            "access-token": token,
          },
        } */
      );
      setUSerQuestions(response.data[0].userQuestions);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUserQuestions();
  }, [renderToggle]);

  return (
    <div>
      <div className="col-12">
        <div className="header">
          <h1>Your Questions</h1>
          <button
            type="button"
            className="btn btn-primary rounded-0"
            onClick={() => {
              navigateTo("/ask-question");
            }}
          >
            ASK
          </button>
        </div>
      </div>
      <div className="questions-list">
        {userQuestions &&
          userQuestions.map((question) => (
            <div
              className="question-container d-flex justify-content-between"
              style={{ padding: "10px", minHeight: "100px" }}
            >
              <h5
                style={{ cursor: "pointer" }}
                onClick={() => {
                  if (token) {
                    navigateTo("/questions/" + question["_id"]);
                  } else {
                    navigateTo("/login");
                  }
                }}
              >
                {question.title}
              </h5>
             {/*  <DeleteIcon /> */}
            </div>
          ))}
      </div>
    </div>
  );
}

export default UserQuestionsList;
