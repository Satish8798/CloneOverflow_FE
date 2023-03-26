import React from 'react'
import "./PageNotFound.css"

function PageNotFound() {
  return (
    <div className='container'>
        <div className="row flex justify-content-center align-items-center p-2" style={{height: "80vh"}}>
            <div className="col-12 col-md-8 col-lg-6 text-center main-text">
                <h1>Error 404!!</h1>
                <h1>Page Not Found</h1>
            </div>
        </div>
    </div>
  )
}

export default PageNotFound