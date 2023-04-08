import React, { useState, useContext } from 'react'
import {UserContext} from '../context/UserProvider.js'

const initInputs = {
  title: "",
  description: ""
}
    
export default function Update(props){
//   const [inputs, setInputs] = useState(initInputs)
 
  const{ updateIssue, id, edit, inputs, setInputs, title, description}= props

  function handleChange(e){
    const {name, value} = e.target
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))
  }

  console.log(inputs)

  function handleSubmit(e){
    e.preventDefault()
    updateIssue(inputs,id) 
  } 
  
  return(
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        name="title" 
        value={inputs.title} 
        onChange={handleChange} 
        />
        
      <input 
        type="text" 
        name="description" 
        value={inputs.description} 
        onChange={handleChange} 
        />
        {/* placeholder="Description" */}
        <button>Submit</button>
    
    </form>
  )
}