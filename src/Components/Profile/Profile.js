import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/loginSlice";
import { removeUser } from "../../features/userSlice";
import { useEffect, useState } from "react";
import UserQuestionsList from "./UserQuestionsList";
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from "@mui/material/Tooltip";

function Profile() {

  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const user = useSelector((state) => state.user.value);
  const [loadingTime, setLoadingTime] = useState(true);

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        setLoadingTime(false);
      }, 1000);
    }
  }, []);

  return (
    <div className="container">
      <div className="row mt-2">
        <div className="col-12">
          {loadingTime ? (
            <div className="card" aria-hidden="true">
              <div className="card-body">
                <h5 className="card-title placeholder-glow">
                  <span className="placeholder col-6"></span>
                </h5>
                <p className="card-text placeholder-glow">
                  <span className="placeholder col-7"></span>
                  <span className="placeholder col-4"></span>
                  <span className="placeholder col-4"></span>
                  <span className="placeholder col-6"></span>
                  <span className="placeholder col-8"></span>
                </p>
              </div>
            </div>
          ) : (
            <div className="card d-flex flex-row">
              <div className="card-body">
                <h1 className="card-title">{user.name}</h1>
                <p className="card-text">
                  <small>{user.email}</small>
                </p>
                <p className="card-text">
                  {user.about}
                </p>
              </div>
              <div style={{paddingRight: "20px"}}>
              <Tooltip title="edit profile" placement="top">
              <EditIcon onClick={()=>{
                navigateTo('/profile/edit')
              }}/>
              </Tooltip>
              </div>
            </div>
          )}
          <button
            type="button"
            className="btn btn-primary mt-2"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              dispatch(logout());
              dispatch(removeUser());
              navigateTo("/");
            }}
          >
            Log out
          </button>
        </div>
      </div>
      <div className="row mt-4">
        <UserQuestionsList/>
      </div>
    </div>
  );
}

export default Profile;
