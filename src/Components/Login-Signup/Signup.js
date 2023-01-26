import React, { useState } from "react";
import "./signup-login.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";

function Signup() {
  const [loading, setLoading] = useState(false);
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    about: "",
  };

  const [inputData, setInputData] = useState(initialValues);
  const [newEmail, setNewEmail] = useState(true);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [signupStatus, setSignupStatus] = useState(false);

  const navigateTo = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://cloneoverflow.onrender.com/user/signup",
        {
          ...inputData,
        }
      );
      if (response.data.msg) {
        setInputData(initialValues);
        setSignupStatus(true);
        setNewEmail(true);
        setPasswordMatch(true);

        setTimeout(() => {
          setSignupStatus(false);
          setLoading(false);
          navigateTo("/login");
        }, 2000);
      }
    } catch (error) {
      if (error.response.data.msg === "email already exists") {
        setLoading(false);
        setNewEmail(false);
        setTimeout(() => {
          setNewEmail(true);
        }, 2000);
      } else if (error.response.data.msg === "password not matching") {
        setLoading(false);
        setPasswordMatch(false);
        setTimeout(() => {
          setPasswordMatch(true);
        }, 3000);
      }
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
            <div className="form-floating mb-3  w-75">
              <input
                type="text"
                className="form-control rounded-0 h-25"
                placeholder="name"
                required
                value={inputData.name}
                onChange={(e) => {
                  setInputData({ ...inputData, name: e.target.value });
                }}
              />
              <label>Name</label>
            </div>
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
            <div className="form-floating mb-3 w-75">
              <input
                type="password"
                className="form-control rounded-0 h-25"
                placeholder="Password"
                required
                value={inputData.confirmPassword}
                onChange={(e) => {
                  setInputData({
                    ...inputData,
                    confirmPassword: e.target.value,
                  });
                }}
              />
              <label>Confirm Password</label>
            </div>
            <div className="form-floating mb-3 w-75">
              <textarea
                className="form-control rounded-0 h-100"
                placeholder="write about you..."
                value={inputData.about}
                onChange={(e) => {
                  setInputData({ ...inputData, about: e.target.value });
                }}
              ></textarea>
              <label>About</label>
            </div>
            <button type="submit" className="btn btn-primary rounded-0 w-75">
              {loading ? (
                <div class="spinner-border text-light" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              ) : (
                <p>Sign up</p>
              )}
            </button>
          </form>
          <Link to="/login">Already a user? Login</Link>
          {!newEmail && (
            <div className="alert alert-danger mt-2" role="alert">
              Email Already Exists!!!
            </div>
          )}
          {!passwordMatch && (
            <div className="alert alert-danger mt-2" role="alert">
              Password should match!!!
            </div>
          )}
          {signupStatus && (
            <div className="alert alert-danger mt-2" role="alert">
              Signedup successfully!! please login
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Signup;
