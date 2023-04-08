const express = require("express")
const issueRouter = express.Router()
const Issue = require('../models/issue.js')
const Comment = require('../models/comment.js')

// Get 
issueRouter.get("/", (req, res, next) => {
  Issue.find((err, issues) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(issues)
  })
})


// issueRouter.post("/:issueId/saveComment", (req, res, next) => {
//   req.body.user = req.auth._id
//   const issueId = req.params.issueId
//   // req.body.username = req.user.username
//   // req.body.timestamps = req.user.timestamps

//   const newSavedComment = new Comment(req.body)

//   Issue.findById({ _id: issueId}, (err, issue) => {
//       if(err) {
//           res.status(500)
//           return next(err)
//       }
//       issue.comment.push(newSavedComment)
//       issue.populate("comment")
//       issue.save()
      
//       return res.status(200).send(issue)
//   })
// })


// Get Issues by user id
issueRouter.get("/user", (req, res, next) => {
  Issue.find({ user: req.auth._id }, (err, issues) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(issues)
  })
})

// userAxios.get('/api/comment')  userAxios.post(`/api/issue/comment/${issueI
//ADD COMMENT
issueRouter.post("/comment/:issueId", (req,res,next ) => {
  req.body.user = req.auth._id
  const issueId = req.params.issueId
  // const newComment = new Comment(req.body)
  // console.log(req.body, "req.body")
  // console.log(newComment, "new Comment")

  Issue.findById({_id: issueId}, (err, issue) => {
      if(err){
      res.status(500)
      return next(err)
    }
    console.log(issue, "issue")
    issue.comment.push(req.body) 
    issue.populate("comment")
    issue.save()

    return res.status(200).send(issue)
  })
})

// Add new Issue
issueRouter.post("/", (req, res, next) => {
  req.body.user = req.auth._id
  const newIssue = new Issue(req.body)
  newIssue.save((err, savedIssue) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(201).send(savedIssue)
  })
})
// Delete Issue
issueRouter.delete("/:issueId", (req, res, next) => {
  console.log('incoming ID', req.params.issueId)
  Issue.findOneAndDelete(
    { _id: req.params.issueId},
    (err, deletedIssue) => {
      console.log(deletedIssue)
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(`Successfully delete Issue: ${deletedIssue}`)
    }
  )
})
// Update Issue
issueRouter.put("/:issueId", (req, res, next) => {
  Issue.findOneAndUpdate(
    { _id: req.params.issueId},
    req.body,
    { new: true },
    (err, updatedIssue) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(201).send(updatedIssue)
    }
  )

})
///// routes for VOTES
//UPVOTES
issueRouter.put("/upvote/:issueId", (req,res,next) =>{
  Issue.findByIdAndUpdate({_id: req.params.issueId},
    { $addToSet: { upvote: req.auth._id }, $pull : {downvote: req.auth._id} },
  {new: true},
  (err, undatedIssue) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(201).send(undatedIssue)
  }
    )
})
// DOWNVOTE
issueRouter.put("/downvote/:issueId", (req,res,next) =>{
  Issue.findByIdAndUpdate({_id: req.params.issueId },
    { $addToSet: { downvote: req.auth._id }, $pull : {upvote: req.auth._id} },
    {new: true},
  (err, undatedIssue) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(201).send(undatedIssue)
  }
    )
})

module.exports = issueRouter