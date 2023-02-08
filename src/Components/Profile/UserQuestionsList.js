import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { red } from '@mui/material/colors';

function UserQuestionsList() {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const user = useSelector((state) => state.user.value);
  const [userQuestions, setUSerQuestions] = useState([]);
  const [renderToggle, setRenderToggle] = useState(false);
  const token = localStorage.getItem("token");
  const [deleteStatus, setDeleteStatus] = useState(null);

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
      setDeleteStatus(new Array(userQuestions.length).fill(false));
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteQuestion(questionId,index) {
    try {
      const response = await axios.delete(
        "https://cloneoverflow.onrender.com/questions/delete/" + questionId
        /* {
          headers: {
            "access-token": token,
          },
        } */
      );
      if (response) {
       let tempArray = [...deleteStatus];
       tempArray[index] = true;
       setDeleteStatus([...tempArray]);
        setTimeout(()=>{
          setRenderToggle(!renderToggle);
        },2000)
      }
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
          userQuestions.map((question,index) => (
            <div
              className="question-container d-flex justify-content-between"
              style={{ padding: "10px", minHeight: "100px" }} key={index}
            >
              {!deleteStatus[index] ? (
                <div>
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
                  <Tooltip title="Delete Question" placement="top-end">
                    <DeleteIcon
                    sx={{
                      color: red['A700'],
                    }}
                      onClick={() => {
                        deleteQuestion(question["_id"],index);
                      }}
                    />
                  </Tooltip>
                </div>
              ) : (
                <Alert severity="success">
                  <AlertTitle>Success</AlertTitle>
                  Question is <strong>deleted!</strong>
                </Alert>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default UserQuestionsList;
