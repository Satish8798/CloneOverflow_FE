import React, { useContext } from "react";
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/loginSlice";
import {removeUser} from '../../features/userSlice';

function Profile() {
  const dispatch= useDispatch();
  const navigateTo = useNavigate();
  const user = useSelector((state)=>state.user.value)
    console.log(user)
  return (
    <div className="container">
      <div className="row">
        <h1>{user.name}</h1>
      </div>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => {
          dispatch(logout());
          dispatch(removeUser());
          localStorage.removeItem("token");
          navigateTo("/")
        }}
      >
        Log out
      </button>
    </div>
  );
}

export default Profile;
