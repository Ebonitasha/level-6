import React, {useContext, useState, useEffect} from 'react'
import AddCommentForm from './AddCommentForm'
import {UserContext} from '../context/UserProvider.js'
import {FaHandPointUp, FaHandPointDown} from "react-icons/fa";

export default function Issue(props){
  const [like, setLike] = useState('')
  const [disLike, setDislike] = useState('')

  const [likeactive, setLikeactive]= useState(false)
  const [dislikeactive, setDislikeactive]= useState(false)

const {allIssues} =props
const {userState, userAxios, getComment, upVote, downVote, postComment}= useContext(UserContext)
console.log(props.allIssues, "test upvote")

  useEffect(() => {
    // userAxios.get("/api/comment")
   getComment()
}, []

)
 
  const savedArr = allIssues.sort((a, b ) => (a.upVote > b.downVote ? 1 : -1))
  console.log(allIssues.sort((b,a) => a.upvote - b.upvote), "ArrTest")
  console.log(props._id, "testing id")
  return (
     <div className="allIssues">
      {
        savedArr.map(issue =>
        <>
        {console.log(issue, "comments?")}
          <div className='container' >
              <div className='listed-issue'>
                <h1 className='allissuestitle'>Title: {issue.title} </h1>
              <h3 className='allissuesdescription'>Problem: {issue.description} </h3>
              </div>
          <div>
          <AddCommentForm key={issue._id} issueId={issue._id}
          />
          </div>
          <div key={issue._id}  className='thecomment'>
          {issue.comment.map((item, index) =>
          <p className='commentTag'>{item.comment}</p>
          )}
            <div className='thrumb'>
            <FaHandPointUp onClick={() => upVote(issue._id)}
              />
                <h3>{issue.upvote.length}</h3>
              <FaHandPointDown onClick={() => downVote(issue._id)}
              />
                <h3>{issue.downvote.length}</h3>
            </div>
           
          </div>
          </div>
        </>
        )
      }
         <hr/>
    </div>
 
  )
}