import React, {useContext, useState, useEffect} from 'react'
import IssueForm from './IssueForm.js'
import UserIssue from './UserIssue.js'
import {UserContext} from '../context/UserProvider.js'


export default function Profile(props){
  const { 
  userState,
  addIssue, 
  getUserIssues,
  userAxios,
  deleteIssue,
  updateIssue,
  
} = useContext(UserContext)

useEffect(() => {
  getUserIssues()
  // userAxios.get("/api/issue/user")
  //    .then(res => setGetUser(res.data))
  //    .catch(err => console.log(err))
 },[]
)
 console.log(userState)
  return (
  
     <div className="profile">
          <h1>Welcome @{userState.user.username}!</h1>
          <h3>Add your Political Issue </h3>
        
      
          <IssueForm  submit={addIssue} btnText={'Add Issue'} />

          <h3>Your Political Issues</h3>
          {userState.issues.map(issue =>(
              <div>
               
                  <UserIssue 
                  {...issue}
                  key={issue._id} 
                  deleteIssue = {deleteIssue}
                  updateIssue = {updateIssue}
                  />  
                </div>
          ))} 
      </div>
    )
  
  
}


            {/* <div>
              {userState.map(issue =>{
                  <UserIssue {...issue} 
                  key={issue._id} 
                  deleteIssue = {deleteIssue}
                  updateIssue = {updateIssue}
                  /> 
               })} 
            </div> */}
        {/* <div>
          <UserIssue  {...issue} 
          key={issue._id} 
          deleteIssue = {deleteIssue}
          updateIssue = {updateIssue}
          /> 
        </div> */}