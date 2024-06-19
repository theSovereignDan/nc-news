import { useEffect, useState, useContext } from "react"
import { fetchAllUsers } from "../api"
import { UserContext } from "./UserContext"
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom';

function SignIn() {

    const [username, setUsername] = useState("")
    const [validUser, setValidUser] = useState("")
    const navigate = useNavigate();

    const {setUser} = useContext(UserContext)

    function onSubmit(event) {

        event.preventDefault()

       return fetchAllUsers().then((users)=> {
            const usernames = users.map((user)=> {
                return user.username
            })

            if (usernames.includes(username)) {
                setValidUser(username)
                setUser(username)
                setTimeout(()=> {
                    navigate('/');
                }, 2000)
            } else {
                setValidUser(false)
            }
        })

       
    }

    function usernameChange(event) {
        setUsername(event.target.value)
    }

    function tryAgainClick(event) {
        location.reload()
    }

    if (validUser === false) {
        return (<div className="signin">
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
<h1>Username was Incorrect</h1>
<button onClick={tryAgainClick}>Try Again</button>
</div>)
    }else if (validUser) {
        return (<div className="signin">
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
        <h1>You are now logged in : {validUser}</h1>
</div>)
    } else {
    return (<div className="signin">
                    <br></br>
                    <br></br>
                    <br></br>
                            <br></br>
                            <br></br>
                    <h1>Sign In Page</h1>
                    <br></br>
        <form>
            <label className="voted">Username</label>
            <br></br>
            <input onChange={usernameChange}/>
            <br></br>
            <br></br>
            <br></br>
            <button onClick={onSubmit}>Sign in</button>
        </form>
        <br></br>            
        <br></br>    
        </div>)
    }
}

export default SignIn