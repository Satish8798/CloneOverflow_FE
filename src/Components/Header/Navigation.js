import "./Navigation.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Navigation() {
  const loginStatus = useSelector((state) => state.login.value);
  const [search, setSearch] = useState("");
  const navigateTo = useNavigate();

  return (
    <nav class="navbar navbar-expand-lg">
      <div class="container">
        <div
          className="logo-name"
          onClick={() => {
            navigateTo("/");
          }}
        >
          <h2>
            <span
              style={{
                fontWeight: "500",
                color: "red",
              }}
            >
              Clone
            </span>
            <span
              style={{
                fontWeight: "500",
                color: "green",
              }}
            >
              Overflow
            </span>
          </h2>
        </div>
        <h5
          className="me-2"
          style={{
            cursor: "pointer",
          }}
          onClick={() => {
            navigateTo("/");
          }}
        >
          Questions
        </h5>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <form class="d-flex ms-2 me-auto w-50" role="search" onSubmit={()=>{
            navigateTo("/question-results/"+search);
            setSearch('');
          }}>
            <input
              class="form-control m-2"
              type="search"
              placeholder="Search by tag..."
              aria-label="Search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <button class="btn btn-outline-success h-25 mt-auto mb-auto" type="submit">
              Search
            </button>
          </form>
          <ul class="navbar-nav  mb-2 mb-lg-0">
            <li class="nav-item">
              {!loginStatus && (
                <div className="login-signup">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => {
                      navigateTo("/login");
                    }}
                  >
                    Log in
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      navigateTo("/signup");
                    }}
                  >
                    Sign up
                  </button>
                </div>
              )}
              {loginStatus && (
                <div
                  onClick={() => {
                    navigateTo("/profile");
                  }}
                >
                  <AccountCircleIcon style={{
                    marginTop:".5rem"
                  }} />
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
