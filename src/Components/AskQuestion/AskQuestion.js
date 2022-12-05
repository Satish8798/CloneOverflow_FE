import React, { useState,useContext, useEffect } from "react";
import "./AskQuestion.css";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import { useSelector } from "react-redux";

function AskQuestion() {
  const initialValues = {
    title: "",
    description: "",
    tags: "",
  };
  const navigateTo=useNavigate();
  const user= useSelector((state)=>state.user.value)
  const [inputData, setInputData] = useState(initialValues);
  const token = localStorage.getItem("token");
  const userId= user["_id"];
  const userName= user["name"];
  const userEmail= user["email"];
 
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/questions/create-question",
        {
          ...inputData,user:userId,userName,userEmail
        },
        {
          headers: {
            "access-token": token,
          },
        }
      );
      if(response.data.msg){
        setInputData(initialValues);
        alert("question created successfully");
        navigateTo("/");
      }
    } catch (error) {
        console.log(error)
       alert("Enter data correctly");
    }
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12">
          <form
            onSubmit={(event) => {
              handleSubmit(event);
            }}
          >
            <div className="question-title-form p-2">
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Can we create stackoverflow clone using nodejs and react"
                  value={inputData.title}
                  onChange={(e) => {
                    setInputData({ ...inputData, title: e.target.value });
                  }}
                />
              </div>
            </div>
            <div className="question-description-form p-2">
              <label className="form-label">
                Explain more about the doubt or problem
              </label>
              <textarea
                className="form-control h-75"
                rows="3"
                value={inputData.description}
                onChange={(e) => {
                  setInputData({ ...inputData, description: e.target.value });
                }}
              ></textarea>
            </div>
            <div className="question-tags-form p-2 mt-3">
              <div className="mb-3">
                <label className="form-label">Tags</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="give comma seperated values"
                  value={inputData.tags}
                  onChange={(e)=>{
                    setInputData({...inputData,tags:e.target.value})
                  }}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary rounded-0 w-25">
              post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AskQuestion;
