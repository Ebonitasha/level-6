import React, {useState} from 'react'
import axios from 'axios'


export const UserContext = React.createContext()

const userAxios = axios.create()

//auto apply token to user the way we used postman 
userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})


export default function UserProvider(props){
    const initState = {
        user: JSON.parse(localStorage.getItem("user")) || {}, 
        token: localStorage.getItem("token") || "",
        issues:[],
        errMsg: ""  // setting up error message  last
    }
    const [userState, setUserState] = useState(initState)


function signup(credentials){
    axios.post("/auth/signup", credentials)
    .then(res =>{
        const {user, token} = res.data
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))
        setUserState(prevUserState => ({
            ...prevUserState,
            user,
            token
        }))
    })
    // .catch(err => console.log(err.response.data.errMsg)) //SET UP SIGNIN, USE BELOW WHEN SETTING UP ERROR MSG
    .catch(err => handleAuthErr(err.response.data.errMsg))
}

function login(credentials){
    axios.post("/auth/login", credentials)
    .then(res =>{
        const {user, token} = res.data
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))
        getUserIssues()
        setUserState(prevUserState => ({
            ...prevUserState,
            user,
            token,
            
        }))
    })
    // .catch(err => console.log(err.response.data.errMsg)) SET UP LOGIN, USE BELOW WHEN SETTING UP ERROR MSG
    .catch(err => handleAuthErr(err.response.data.errMsg))
}

function logout(){
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUserState({
        user: {},
        token: "",
        issues: [],
        comment:""
    })
}

//ADD ON PART 3 OR WHENSETTING UP 
function handleAuthErr(errMsg){
    setUserState(prevState => ({
      ...prevState,
      errMsg
    }))
  }

  function resetAuthErr(){
    setUserState(prevState => ({
      ...prevState,
      errMsg: ""
    }))
  }
function getIssues(){
    userAxios.get('/api/issue')
     .then(res => setUserState(res.data))
     .catch(err => console.log(err.response.data.errMsg))
}

function getUserIssues(){
    userAxios.get('/api/issue/user')
     .then(res => {
        setUserState(prevState => ({
            ...prevState,
            issues: res.data
        }))
     })
     .catch(err => console.log(err.response.data.errMsg))
}

function addIssue(newIssue, issueId){
    console.log(newIssue, "test issue")
    userAxios.post("/api/issue", newIssue)
    .then(res => {
        setUserState(prevState => ({
            issues: [... prevState.issues.map(issue => issue._id === issueId ? res.data : issue)]   
    //         }))
    //     })
        //     ...prevState, 
        // issues: [...prevState.issues.map(issue => issue._id === issue ? res.data : issue)]
            // ...prevState.issues
            // issues: [...prevState.issues, res.data]
            // issues: [...prevState.issues.map(issue => issue._id === issueId ? res.data : issue)]
            // return { 
            //     ...prevState,
    //          }}     //     issues: [...prevState.issues]
        }))
     })

    .catch(err => console.log(err.response.data.errMsg))
}

function getComment(){
    userAxios.get('/api/comment')
    // .then(res => console.log(res.data, "getComment response"))
    .then(res => {
       setUserState(prevState => ({
           ...prevState,
           issues: res.data
       }))
    })
    .catch(err => console.log(err.response.data.errMsg))
}

function postComment(newComment, issueId){ 
    console.log(newComment, "test comment")
    userAxios.post(`/api/issue/comment/${issueId}`, newComment)
    // .then(res => console.log(res))
    .then(res => {
        setUserState(prevState => ({
        ...prevState,
        issues: [...prevState.issues.map(issue => issue._id === issueId ? res.data : issue)]
        }))
    })
    .catch(err => console.log(err.response.data.errMsg))
}

function deleteIssue(issueId){
    console.log('issueId in deleteIssue', issueId)
    userAxios.delete(`/api/issue/${issueId}`)
    .then(res => setUserState(prevState => {
           return {
            ...prevState,
           issues: [ ...prevState.issues.filter(issue => issue._id !== issueId)]
           } 
        
    }))
    .catch(err => console.log(err))
}

function updateIssue(updates, issueId){
    console.log("update test")
    userAxios.put(`/api/issue/${issueId}`, updates)
    
    .then(res => {
        console.log(res, "test")
        setUserState(prevState => ({
            ...prevState,
            issues: prevState.issues.map(issue => issue._id !== issueId ? issue : res.data)
        }))
     })
     .catch(err => console.log(err))
}
    // .then(res => {
    //     setUserState(prevState => prevState.issues.map(issue => issue._id !== issueId ? issue : res.data))
    // })
//     .catch(err => console.log(err))
// }

function upVote(issueId){
    userAxios.put(`/api/issue/upvote/${issueId}`)
    .then(res =>{
    console.log(res.data)
    setUserState( prevState => {
        return { 
            ...prevState,
            issues: [...prevState.issues]
        }
     })
    })
    .catch(err => console.log(err))
}

function downVote(issueId){
    userAxios.put(`/api/issue/downvote/${issueId}`)
    .then(res =>{
    console.log(res.data)
    setUserState( prevState => {
        return { 
            ...prevState,
            issues: [...prevState.issues]
        }
     })
    })
    .catch(err => console.log(err))
}


    return(
        <UserContext.Provider
        value={{
            userState, 
            signup,
            login,
            logout,
            getIssues,
            addIssue,
            getUserIssues,// called in login function
            handleAuthErr,
            resetAuthErr,
            getComment,
            postComment,
            userAxios,
            deleteIssue,
            upVote,
            downVote,
            updateIssue
    
        }}>
            {props.children}


        </UserContext.Provider>
    )
}