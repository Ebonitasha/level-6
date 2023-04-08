const mongoose = require('mongoose')
const Schema = mongoose.Schema

const issueSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  completed: {
    type: Boolean,
    default: false
  },
  comment:{
    type: Array,
  },
  upvote: [{
    type: Schema.Types.ObjectId,
    ref: "User"
   
  }],
  downvote: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }], 
  votedUsers:[ {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
})

module.exports = mongoose.model("Issue", issueSchema)