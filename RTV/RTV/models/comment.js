const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({

  comment: {
    type: String,
    required: false
  },
  // issue: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Issue",
  //   required: false
  // },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: false
  }
 

})
module.exports = mongoose.model("Comment", commentSchema)