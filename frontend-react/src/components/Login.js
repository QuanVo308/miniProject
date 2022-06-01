import { useLocation, useNavigate, useResolvedPath } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios'


const Login = () => {
    const axiosClient = axios.create({
        baseURL: 'http://127.0.0.1:8000/'
    })
    const [user, setUser] = useState()
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    useEffect( () => {
        console.log("re-render")
        axiosClient.get("http://localhost:8000/api/getuser/",  {header: {
            Cookie: 'zxcasfawdac'
        }})
        .then((res) => {
            console.log("user:", res.data['user']) 
        })
    },)

    const location = useLocation()

    let navigate = useNavigate()
    

    const clickHandler = (e) => {
        console.log(e.target.value)
        navigate(e.target.value)
    }

    const login = async (e) => {
        e.preventDefault()
        console.log('login', username, password)
        const check = await axios.post("http://localhost:8000/api/login", { 
            username: username,
            password: password
        }, {withCredentials : true})
        .then( (res) => {
            console.log("res", res.data.accessToken)
        })
        // const cookie = loginUser.headers["set-cookie"][0]
        // axiosClient.defaults.headers.Cookie = cookie;
        console.log("check", check)
        navigate('/login')
    }
    const test = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'ktht' })
        };
        console.log(requestOptions['body'])
        fetch('http://localhost:8000/api/test', requestOptions)
            .then(response => response.json())
            .then(data => console.log(data));
    }

    const getUser = () => {
        axios.get("http://localhost:8000/api/getuser/", {withCredentials : true})
        .then((res) => {
            console.log("user:", res.data['user']) 
        })
    }
    const logout = (e) => {
        e.preventDefault()
        axios.get("http://localhost:8000/api/logout/", {withCredentials : true})
        .then( (res) => {
            console.log(res.data['response'])
        })
        navigate('/login')
    }

    return (
        <>
            <button onClick={clickHandler} value = "/"> Home</button>
            <br></br>
            <br></br>
            <br></br>
            <form onSubmit={login}>
                <h1>LOGIN</h1>
                <label htmlFor="username">Username: </label>
                <input id="username" type="text" name="username" onChange={ (e) => {
                    setUsername(e.target.value)
                }}></input>
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
            <button onClick={getUser}> get user</button>
            <button onClick={test}> test</button>

        </>
    )
}

export default Login