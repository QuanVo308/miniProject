import { useLocation, useNavigate, useResolvedPath } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios'
import authenService from "../../services/authen.service"

const Login = ({user, setUser}) => {
    //const [user, setUser] = useState()
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    useEffect( () => {
        axios.get("http://localhost:8000/api/getuser/",  {withCredentials : true})
        .then((res) => {
            console.log("user useEffect:", res.data['user'])
            setUser(res.data['user']) 
        })
    }, [user])

    const location = useLocation()

    let navigate = useNavigate()

    let props = {user, setUser, username, setUsername, password, setPassword, navigate, location }

    const login = async (e) => {
        authenService.login(e, props)
    }

    const logout = (e) => {
        authenService.logout(e, props)
        navigate('/login')
    }

    const test = async () => {
        console.log(props.username)
    }

    return (
        <>
            <h1>LOGIN {user && 'as ' + user}</h1>
            <form onSubmit={login}>
                <label htmlFor="username">Username: </label>
                <input id="username" type="text" name="username" onChange={(e)=>{setUsername(e.target.value)}}></input>
                <br></br>
                <br></br>
                <label htmlFor="password">Password: </label>
                <input id="password" type="password" name="password" onChange={ (e) => {
                    setPassword(e.target.value)
                }}></input>
                <br></br>
                <br></br>
                <input type="submit" value="Login"></input>
            </form>
            <form onSubmit={logout}>
                <input type="submit" value="Logout"></input>
            </form>
            <button onClick={authenService.getUser}> get user</button>
            <button onClick={test}> test</button>
        </>
    )
}

export default Login