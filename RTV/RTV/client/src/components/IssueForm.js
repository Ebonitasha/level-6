import React, { useState, useContext } from 'react'
import {UserContext} from '../context/UserProvider.js'

const initInputs = {
  title: "",
  description: ""
}

export default function IssueForm(props){
  const [inputs, setInputs] = useState(initInputs)
  const {addIssue } = useContext(UserContext)


  const{btnText, update, issue_id}= props

  function handleChange(e){
      // setComments(e.currentTarget.value)
    const {name, value} = e.target
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))
  }
// console.log(submit, "test submit")
//   console.log(addIssue, "testing issue")

// const inputData = {
//   initInputs:inputs.initInputs
// }

  function handleSubmit(e){
    e.preventDefault()
    // submit(inputs)
    // submit(addIssue)
    addIssue(inputs, issue_id)
    // addIssue(inputs, id)
    setInputs(initInputs)

  } 
  // props.edit ? update :
  return(
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        name="title" 
        value={inputs.title} 
        onChange={handleChange} 
        placeholder="Title"
        />
      <input 
        type="text" 
        name="description" 
        value={inputs.description} 
        onChange={handleChange} 
        placeholder="Description"/>
        <button className='issueBtn'>{ btnText }</button>
        
      
      {/* <button>Add New Issue</button> */}
    </form>
  )
}