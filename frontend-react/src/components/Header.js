import { Routes, Route, Link, useNavigate, useLocation  } from "react-router-dom";
import styles from "../theme/Header.module.css"
import { useState, useEffect } from 'react';
import axios from 'axios'
import authenService from "../services/authen.service"


export default function Header(props) {
    //const [user, setUser] = useState()

    const location = useLocation();

    const navigate = useNavigate()

    props = {...props, navigate}

    useEffect( () => {

        axios.get("http://localhost:8000/api/getuser/",  {withCredentials : true})
        .then((res) => {
            props.setUser(res.data['user']) 
        })

    }, [props.user])    

    const lout = (e) => {
        authenService.logout(e, props)
    }

    return(
        <div className={styles.parent}>
            <h1 className={styles.box}><Link to="/" className={styles.header}>MiniProject</Link></h1> 

            {props.user ? 
            <h1 className={styles.info}>{props.user}</h1> : location.pathname == '/register' ? <h1 className={styles.info}>
            <Link to="/login" className={styles.login}>Login</Link>
            </h1> :
            location.pathname != '/login' && <h1 className={styles.info}>
                <Link to="/login" className={styles.login}>Login</Link> / <Link to="/register" className={styles.login}>Sign Up</Link>
                </h1>}
            {props.user && 
            <h1 className={styles.logout}><Link to="/login" onClick={lout} className={styles.login}>Logout</Link></h1>}
            
        </div>
    )
}