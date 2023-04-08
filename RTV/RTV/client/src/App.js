import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar.js'
import Auth from './components/Auth.js'
import Profile from './components/Profile.js'
import Public from './components/Public.js'
import ProtectedRoute from './components/ProtectedRoute.js'
import { UserContext } from './context/UserProvider.js'

export default function App(){
  const {userState, logout, addIssue} = useContext(UserContext)
  console.log(userState)
  return (
    
    <div className="app">
        {/* <Navbar logout = {logout}/> 1ST WHEN CREATING THE APP */}

      { userState.token && <Navbar logout = {logout}/>}       
        {/* THIS WAY FINISH TO MAKE THE LOGIN A CONDICTIONAL VIEW */}
      <Routes>
        <Route 
          path="/" 
        // element={ userState.token ? <Navigate to= <Auth />}
           element={ <Auth /> }
        />
        <Route 
          path="/profile"
          element= {userState.token ? <Profile/> : <Navigate replace to = "/" />}
          // element={<ProtectedRoute token={userState.token} >
          //     <Profile/>
          // </ProtectedRoute>}
        />
        <Route 
          path="/public"
          element={<ProtectedRoute token={userState.token} redirectTo="/">
              <Public submit={addIssue}/>
          </ProtectedRoute>}
        />
        
      </Routes>
    </div>
  )
}