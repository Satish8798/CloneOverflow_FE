import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import QuestionsList from "../QuestionsList/QuestionsList";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/loginSlice";
import {setUser} from '../../features/userSlice';

function Home() {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const loginStatus = useSelector((state) => state.login.value);
  useEffect(() => {
    if (localStorage.getItem("token")) dispatch(login());
    if (localStorage.getItem("user")){
        let userItem = JSON.parse(localStorage.getItem("user")); 
        dispatch(setUser(userItem));
    }
  }, []);

  return (
    <div className="container">
      {!loginStatus && (
        <div className="mt-5">
          <h1>
            Please Signup and Login <br />
            to
            <br />
            <span className="text-danger">ASK</span> or{" "}
            <span className="text-success">ANSWER</span>
            <br /> questions
          </h1>
          <h2>
            or Search for Questions
          </h2>
        </div>
      )}
      {loginStatus && (
        <div className="wrapper">
          <div className="row">
            <div className="col-12 mt-5">
              <div className="header">
                <h1>Top Questions</h1>
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
          </div>
          <div className="questions-list">
            <QuestionsList />
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
