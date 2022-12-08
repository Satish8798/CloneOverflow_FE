import React, { useState } from "react";
import "./signup-login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../../features/loginSlice";
import { setUser } from "../../features/userSlice";

function Login() {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };
  const [inputData, setInputData] = useState(initialValues);
  const [loginValidation, setLoginValidation] = useState(true);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await axios.post("https://cloneoverflow.onrender.com/user/login", {
        ...inputData,
      });
      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.userDetails));
      console.log(response.data.user);
      dispatch(setUser({ ...response.data.user }));
      dispatch(login());
      navigateTo("/");
    } catch (error) {
      console.error(error);
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
                value={inputData.passowrd}
                onChange={(e) => {
                  setInputData({ ...inputData, password: e.target.value });
                }}
              />
              <label>Password</label>
            </div>
            <button type="submit" className="btn btn-primary rounded-0 w-75">
              Login
            </button>
          </form>
          <Link to="/signup">New User? signup</Link>
          <br />
         {/*  <Link to="/reset-password">forgot password?</Link> */}
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
