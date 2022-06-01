import { useLocation, useNavigate, useResolvedPath } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios'
import authenService from "../../services/authen.service"

const Register = ({user, setUser}) => {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    return(
        <>
        <hq>REGISTER</hq> 
        <form>
            <label htmlFor="username">Username: </label>
            <input id="username" type="text" name="username" onChange={(e)=>{setUsername(e.target.value)}}></input>
            <br></br>
            <br></br>
            
        </form>
        </>
    )
}

export default Register