const express = require("express")
const commentRouter = express.Router()
const Comment = require("../models/comment.js")

//GET COMMENTS ALL
commentRouter.get("/", (req,res,next)=>{
    Comment.find( (err, comments) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(comments)
    })
  })


  commentRouter.post("/:issueId", (req,res, next)=>{
    req.body.user = req.auth._id
    req.body.issueId = req.params.issueId
    const newComment = new Comment(req.body)
    newComment.save((err, newComment ) =>{
      if(err){
        res.status(500)
        return next(err)
      }
      
      return res.status(201).send(newComment)
    })
    
  } )

  commentRouter.get("/:issueId", (req,res, next) =>{
    Comment.find( {issue : req.params.issueId})
    .exec( (err, comments) =>{
      if(err){
        res.status(500)
        return next(err)
      }
      return res.send(comments)
    })
      
  })



  //ADD COMMENT
//   commentRouter.post("/comment/:issueId", (req,res,next ) => {
//     req.body.user = req.auth._id
//     // req.body.timeStamps = req.auth.timeStamps
//     const issueId = req.params.issueId
    // const newComment = new Comment(req.body)
    // console.log(req.body, "req.body")
    // console.log(newComment, "new Comment")
  
    // Comment.findById({_id: issueId}, (err, issue) => {
    //     if(err){
    //     res.status(500)
    //     return next(err)
    //   }
    //   console.log(issue, "issue")
    //   issue.comment.push(req.body)
    //   issue.populate("comment")
    //   issue.save()
  
    //   return res.status(200).send(issue)
    // })

module.exports = commentRouter