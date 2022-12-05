import "./Navigation.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Navigation() {
  const loginStatus = useSelector((state) => state.login.value);
  const [search, setSearch] = useState("");
  const navigateTo = useNavigate();

  return (
    <div className="container-fluid ">
      <nav className="navigation-bar">
        <div
          className="logo-name"
          onClick={() => {
            navigateTo("/");
          }}
        >
          <p>
            <span
              style={{
                fontWeight: "500",
                color: "red",
              }}
            >
              stack
            </span>
            <span>overflow</span>
            <span
              style={{
                fontWeight: "500",
                color: "green",
              }}
            >
              clone
            </span>
          </p>
        </div>
        <div className="search-form">
          <form onSubmit>
            <div className="form-items">
              <input
                type="text"
                className="form-control"
                placeholder="search..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <button type="submit" className="btn btn-primary mb-3">
                <SearchIcon />
              </button>
            </div>
          </form>
        </div>
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
          <div onClick={()=>{
            navigateTo("/profile");
          }}>
            {/* <i
              className="bi bi-person-fill profile-icon"
              onClick={() => { */}
               {/*  /*  navigateTo("/profile"); */ }
              {/* }}
            ></i> */}
            <AccountCircleIcon/>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navigation;
