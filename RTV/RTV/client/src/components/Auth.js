import React, { useState, useContext } from 'react'
import AuthForm from './AuthForm.js'
import {UserContext} from '../context/UserProvider.js'


const initInputs = { username: "", password: "" }

export default function Auth(){
  const [inputs, setInputs] = useState(initInputs)
  const [toggle, setToggle] = useState(false)

  const {signup, login, errMsg, resetAuthErr} = useContext(UserContext)

  function handleChange(e){
    const {name, value} = e.target
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))
  }

  function handleSignup(e){
    e.preventDefault()
    signup(inputs)
  }

  function handleLogin(e){
    e.preventDefault()
    login(inputs)
  }

  function toggleForm(){
    setToggle(prev => !prev)
    resetAuthErr()
  }

  return (
    <div className="auth-container">
      <h1>Political Issue App</h1>
      { !toggle ?
        <>
          <AuthForm 
            handleChange={handleChange}
            handleSubmit={handleSignup}
            inputs={inputs}
            btnText="Sign up"
            //passing error msg to form after we passed in as props
            errMsg={errMsg}
          />
          {/* <p onClick={() => setToggle(prev => !prev)}>Already a member?</p>  SETUP FORM THIS WAY BEFORE DOING ERROR MSG*/}
          <p onClick={toggleForm}>Already a member?</p>
        </>
      :
        <>
          <AuthForm 
            handleChange={handleChange}
            handleSubmit={handleLogin}
            inputs={inputs}
            btnText="Login"
              //passing error msg to form after we passed in as props
              errMsg={errMsg}
          />
          {/* <p onClick={() => setToggle(prev => !prev)}>Not a member?</p> SETUP FORM THIS WAY BEFORE DOING ERROR MSG*/}
          <p onClick={toggleForm}>Already a member?</p>
        </>
      }
    </div>
  )
}