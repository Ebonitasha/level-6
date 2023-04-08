import React, { useState, useContext, useEffect } from 'react'
import Issue from './Issue.js'
import {UserContext} from '../context/UserProvider.js'




export default function Public(props){
  const {getComment ,postComment, issues, userAxios,login, userState} = useContext(UserContext) 
  const [allIssues, setallIssues] = useState([])

  useEffect(() => {
   userAxios.get("/api/issue")
    .then(res => setallIssues(res.data))
    .catch(err => console.log(err))
  },[userState]
)
// console.log(issues, "issues")
// console.log(allIssues, "test")

  return (
    <div className="publicHeader">
        <h1>All Users Political Issues</h1>
        <h3>Read and Comment</h3>
      <div className='public-container'>
          <div className='inside-container'>
            <Issue className='public-container' allIssues={allIssues} />
          </div>
        
         </div>

    </div>
  )
}





