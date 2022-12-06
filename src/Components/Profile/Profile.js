import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/loginSlice";
import {removeUser} from '../../features/userSlice';
import { useLayoutEffect } from 'react';

function Profile() {
  const dispatch= useDispatch();
  const navigateTo = useNavigate();
  const user = useSelector((state)=>state.user.value)
  return (
    <div className="container">
      <div className="row">
        <h1>{user.name}</h1>
      </div>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          dispatch(logout());
          dispatch(removeUser());
          navigateTo("/")
        }}
      >
        Log out
      </button>
    </div>
  );
}

export default Profile;
