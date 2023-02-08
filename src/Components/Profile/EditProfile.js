import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import { setUser } from '../../features/userSlice';

function EditProfile() {

    const user = useSelector((state) => state.user.value);
    const dispatch = useDispatch();
    const [updatedData,setUpdatedData]= useState(user);
    const navigateTo = useNavigate();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            const response = await axios.put('http://localhost:8000/user/update',{
                ...updatedData
            });
            if(response.data.msg){
                dispatch(setUser({...updatedData}));
               navigateTo('/profile');
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className='container'>
        <div className="row">
            <form className="col-12 col-md-6 col-lg-4 p-5" onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control rounded-0 h-25" 
                placeholder="name"
                required
                value={updatedData.name}
                onChange={(e) => {
                  setUpdatedData({ ...updatedData, name: e.target.value });
                }}
              />
              <label>Name</label>
            </div>
            <div className="form-floating mb-3">
              <textarea
                className="form-control rounded-0 h-100"
                placeholder="write about you..."
                value={updatedData.about}
                onChange={(e) => {
                  setUpdatedData({ ...updatedData, about: e.target.value });
                }}
              ></textarea>
              <label>About</label>
            </div>
            <button type="submit" className="btn btn-primary rounded-0 w-75">Confrim Edit</button>
            </form>
        </div>
    </div>
  )
}

export default EditProfile