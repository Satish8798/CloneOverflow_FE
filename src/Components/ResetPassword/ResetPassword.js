import React from 'react';
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ResetPassword() {

    const navigate = useNavigate();
  const [accountData, setData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: null,
  });
  const [searchStatus, setSearchStatus]= useState(false);
  const [passwordChangeStatus, setPasswordChangeStatus] = useState(false);
  const [alert , setAlert] = useState(false);
  const [matching, setMatching] = useState(true);
  const [success, setSuccess] = useState(false);
  const [otpstatus, setOtpstatus] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpTrue, setOtpTrue] = useState(true);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!accountData.confirmPassword) {
      try {
        let response = await axios.post(
          "http://cloneoverflow.onrender.com/user/search-account",
          {
            ...accountData,
          }
        );
        console.log(response)
        if(response.data.msg){
          setOtpstatus(true);
          setSearchStatus(true);
        }else{
            setAlert(true);
            setTimeout(()=>{
                setData({...accountData,email:""})
                console.log(accountData)
                setAlert(false);
                
            },3000);
        }
      } catch (error) {
        console.log(error);
      }
    }else{
      setMatching(true);
      setSuccess(false);
      try {
        let response = await axios.post(
          "http://cloneoverflow.onrender.com/user/reset-password",
          {
            ...accountData,
          }
        );
        console.log(response)
        if(response.data.msg){
          setMatching(true);
          setSuccess(true);
          setTimeout(()=>{
            navigate('/login')
          },3000)
        }else{
          setMatching(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function checkOtp(){
    try {
      let response = await  axios.post(
        "http://cloneoverflow.onrender.com/user/check-otp",
        {
          email: accountData.email,
          otp: otp
        }
      );

      if(response.data.msg){
        setOtpTrue(true);
        setOtpstatus(false);
        setPasswordChangeStatus(true)
      }else{
        setOtpTrue(false);
      }
    } catch (error) {
      console.log(error);
    }

  }


  return (
    <div  className= "col-xs-12 col-md-5 col-lg-6">
      <form
        className="mt-4 p-2 ms-5 me-5"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="form-floating mb-3 ">
          <input
            type="email"
            onChange={(e) => {
              setData({ ...accountData, email: e.target.value });
            }}
            className="form-control"
            id="floatingInput"
            value={accountData.email}
            required
          />
          <label for="floatingInput">Email</label>
        </div>
        {
          otpstatus && 
          <div>
            <div className="form-floating mb-3 ">
          <input
            type="text"
            onChange={(e) => {
              setOtp(e.target.value);
            }}
            className="form-control"
            id="floatingInput"
            value={otp}
            required
          />
          <label for="floatingInput">OTP</label>
        </div>
        <button type="button" className="btn btn-success mt-3" onClick={
          ()=>{
            checkOtp();
          }
        }>
        send
      </button>
          </div>
        }
        {passwordChangeStatus && (
          <div className="password-change">
            <div className="form-floating  mb-3">
              <input
                type="password"
                onChange={(e) => {
                  setData({ ...accountData, newPassword: e.target.value });
                }}
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                required
              />
              <label for="floatingPassword">New Password</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                onChange={(e) => {
                  setData({ ...accountData, confirmPassword: e.target.value });
                }}
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                required
              />
              <label for="floatingPassword">Confirm Password</label>
            </div>
            <button type="submit" className="btn btn-success mt-3">
              Reset
            </button>
          </div>
        )}
        {!searchStatus && (
          <button type="submit" className="btn btn-success mt-3">
            Search
          </button>
        )}
        {
            alert &&
            (  
                <div class="alert alert-success w-75 mt-3 ms-1" role="alert">
                    account not found!!
                </div>

            )
        }
        {
            success &&
            (  
                <div class="alert alert-success w-75 mt-3 ms-1" role="alert">
                    password Changed successfully
                </div>

            )
        }
        {
          !matching &&
          (  
              <div class="alert alert-success w-75 mt-3 ms-1" role="alert">
                  passwords not matching
              </div>

          ) 
        }
        {
          !otpTrue &&
          (  
              <div class="alert alert-success w-75 mt-3 ms-1" role="alert">
                  Invalid Otp
              </div>

          ) 
        }
      </form>
    </div>
  )
}

export default ResetPassword