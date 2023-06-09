const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')
const {expressjwt} = require('express-jwt')

mongoose.set('strictQuery', true)

app.use(express.json())
app.use(morgan('dev'))

mongoose.connect(
  'mongodb+srv://ebonitasha:Purplekisses2@cluster88.gfnymjn.mongodb.net/?retryWrites=true&w=majority',
  
  () => console.log('Connected to the DB')
)

app.use('/auth', require('./routes/authRouter.js'))
app.use('/api', expressjwt({ secret: "love", algorithms: ['HS256'] })) // req.user
app.use('/api/issue', require('./routes/issueRouter.js'))
app.use('/api/comment', require('./routes/commentRouter.js'))

app.use((err, req, res, next) => {
  console.log(err)
  if(err.name === "UnauthorizedError"){
    res.status(err.status)
  }
  return res.send({errMsg: err.message})
})

app.listen(4000, () => {
  console.log(`Server is running on local port 3000`)
})