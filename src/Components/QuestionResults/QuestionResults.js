import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import {SingleQuestion} from '../QuestionsList/QuestionsList';
import axios from 'axios';
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

function QuestionResults() {
    const [results,setResults]= useState([]);
    const navigateTo = useNavigate();
    const {tag} = useParams();
    async function getResults(){
        try {
            const response = await axios.get("http://localhost:8000/questions/get-results?tag="+tag);
            
             setResults(response.data.results);    
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
          getResults();
    },[tag]);
    
  return (
    <div className="wrapper container">
         <ArrowCircleLeftIcon
        style={{
          marginLeft: "10%",
          fontSize: "40px",
        }}
        onClick={() => {
          navigateTo("/");
        }}
      />
          <div className="row">
            <div className="col-12 mt-5">
              <div className="header">
                <h1>Results</h1>
                <button
                  type="button"
                  className="btn btn-primary rounded-0"
                  onClick={() => {
                     navigateTo("/ask-question"); 
                  }}
                >
                  ASK
                </button>
              </div>
            </div>
          </div>
          <div className="questions-list">
          <div className="container">
      <h4>{results.length} &nbsp; questions</h4>
      <div className="row">
      <div className="col-md-2 col-xs-0">
      </div>
      <div className="col-md-10 col-12">
        {!results ? (
        <h1>Loading...</h1>
      ) : (
        results.map((d, i) => <SingleQuestion key={i} d={d} />)
      )}
        </div>
      </div>
    </div>
          </div>
        </div>
  )
}

export default QuestionResults