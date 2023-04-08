import { useContext, useState } from "react"
import React from 'react'
import { UserContext } from "../context/UserProvider"

const initInputs = {
  comment: ""
}

export default function AddCommentForm(props){
 const [comments, setComments] = useState(initInputs)

 const {getComment, postComment} = useContext(UserContext)
 const {issueId, butText} = props

  function handleChange(e){
    // setComments(e.currentTarget.value)
    const {name, value} = e.target
    setComments(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))
  }
  console.log(issueId, "test")

  const commentData = {
    comment: comments.comment
  }
  
const { comment} = comments
  console.log(comments, "checking comment")

  function handleSubmit(e){
    e.preventDefault()
    //pass in the inputs for the comments as the first argument
    //the issue id as the second argument
    postComment(commentData, issueId)
    setComments(initInputs)
  }

  return (
    <div>
      <form className="addcommentform" onSubmit={handleSubmit}>
         <input
            type="text"
            placeholder="Add a comment"
            onChange={handleChange}
            name="comment"
            value={comment}
         
            />
            <button className="addcommentbtn">Add comment</button>
      </form> 
    </div>
  )
}