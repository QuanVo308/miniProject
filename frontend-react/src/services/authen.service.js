import { useLocation, useResolvedPath } from 'react-router-dom'
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios'


class authenService {
    getUser() {
        axios.get("http://localhost:8000/api/getuser/", {withCredentials : true})
        .then((res) => {
            console.log("user:", res.data['user']) 
            return res.data['user']
        })
    }

    logout(e,props) {
        e.preventDefault()
        axios.get("http://localhost:8000/api/logout/", {withCredentials : true})
        .then( (res) => {
            console.log(res.data['response'])
            props.setUser(null)
        })
        props.navigate('/login')
    }

    test() {
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

    login(e, props) {
        e.preventDefault()
        console.log('login', props.username, props.password)
        axios.post("http://localhost:8000/api/login", { 
            username: props.username,
            password: props.password
        }, {withCredentials : true})
        .then( (res) => {
            if( res.data == 'fail'){
                alert('Login failed')
            } else {
                props.navigate('/')
                props.setUser(props.username)
            }
        })
    }


    register(e, props) {
        e.preventDefault()
        console.log('login', props.username, props.password)
        axios.post("http://localhost:8000/api/register", { 
            username: props.username,
            password: props.password,
            accountGroup: props.type,
            email: props.email
        }, {withCredentials : true})
        .then( (res) => {
            console.log(res.data)
            if(res.data.response == 'ok') {
                props.setUser(props.username)
                props.navigate('/login')
            } else {
                alert("register fail")
            }
            
        })
    }
}


export default new authenService();