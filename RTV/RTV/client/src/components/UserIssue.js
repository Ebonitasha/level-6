
import React, {useState, useContext} from 'react'
import {UserContext} from '../context/UserProvider.js'
import IssueForm from './IssueForm.js'
import Update from './Update.js'


export default function UserIssue(props){
  const [editToggle, setEditToggle] = useState(false)
  const {title, description, _id, deleteIssue, updateIssue, btnText,inputs } = props
  console.log('_id', _id)


  return (
    <div className='userissue'>
      { !editToggle ?
        <>
          <div className='td'>
            <h1 className='userh1'>Title: {title}</h1>
            <h4 className='userh4'>Description: {description}</h4>
          </div> 
          <div className='button-container'>
          <button className='deleteBtn'
          onClick={() => deleteIssue(_id)}
          >Delete</button>

          <button className='editBtn'
          onClick={ () => setEditToggle (prevToggle => !prevToggle)}
          >Edit Issue</button>
          </div>
        </>
        :
        <>
          <IssueForm
          title = {title}
          description = {description}
          submit={updateIssue}
          issueId={_id}
          btnText="Submit Edit"
          edit={editToggle}
          />

          <button className='close' onClick={() => setEditToggle (prevToggle => !prevToggle)}>
              Close edit
            </button>

        </>
      }
    </div>
  )
}

  // update={() => {
          // updateIssue(inputs, _id)
          // setEditToggle(false)
          // } }
          // submit={() => console.log("is edit triggered?")}
          // submit={() => {
          // updateIssue(inputs, _id)
          // setEditToggle(false)
          // } }
          // submit={submitEdits}