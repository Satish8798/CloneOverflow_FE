import React, { useState } from "react";
import "./signup-login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../../features/loginSlice";
import { setUser } from "../../features/userSlice";
import { Tooltip } from "@mui/material";

function Login() {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };
  const [inputData, setInputData] = useState(initialValues);
  const [loginValidation, setLoginValidation] = useState(true);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://cloneoverflow.onrender.com/user/login",
        {
          ...inputData,
        }
      );
      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.userDetails));
      dispatch(setUser({ ...response.data.user }));
      dispatch(login());
      setLoading(false);
      navigateTo("/");
    } catch (error) {
      console.error(error);
      setLoading(false);
      setLoginValidation(false);
    }
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-4 col-sm-6 col-12 signup-form ms-auto">
          <form
            onSubmit={(event) => {
              handleSubmit(event);
            }}
          >
            <div className="form-floating mb-3 w-75">
              <input
                type="email"
                className="form-control rounded-0 h-25"
                placeholder="name@example.com"
                required
                value={inputData.email}
                onChange={(e) => {
                  setInputData({ ...inputData, email: e.target.value });
                }}
              />
              <label>Email address</label>
            </div>
            <div className="form-floating mb-3 w-75">
              <input
                type="password"
                className="form-control rounded-0 h-25"
                placeholder="Password"
                required
                value={inputData.password}
                onChange={(e) => {
                  setInputData({ ...inputData, password: e.target.value });
                }}
              />
              <label>Password</label>
            </div>
            <button type="submit" className="btn btn-primary rounded-0 w-75">
              {loading ? (
                <div className="spinner-border text-light" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                "Login"
              )}
            </button>
            <button type="button" className="btn btn-success mt-2 rounded-0 w-75" onClick={(e) => {
                setInputData({ password: "guestuser@123" , email: "guestuser@gmail.com" });
                console.log(inputData);
              }}>
              Login as Guest user
            </button>
          </form>
          <Link to="/signup">New User? signup</Link>
          <br />
          <Tooltip title="works only for valid gmail accounts">
            <Link to="/reset-password">forgot password?</Link>
          </Tooltip>
          {!loginValidation && (
            <div className="alert alert-danger mt-2" role="alert">
              Invalid email or password
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
