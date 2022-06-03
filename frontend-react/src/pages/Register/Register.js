import { useLocation, useNavigate, useResolvedPath } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios'
import authenService from "../../services/authen.service"
import styles from "./Register.module.css"

const Register = ({user, setUser}) => {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [email, setEmail] = useState()
    const [type, setType] = useState()
    const navigate = useNavigate()

    let props = {user, setUser, username, setUsername, password, setPassword, email, setEmail, type, setType, navigate}

    useEffect( () => {
        setType("CNT")
    }, [])

    const registerUser = (e) => {
        authenService.register(e, props)
        console.log("register base", props)
    }

    return(
        <>
        {/* <h1>REGISTER</h1> 
        <form>
            <label htmlFor="username">Username: </label>
            <input id="username" type="text" name="username" onChange={(e)=>{setUsername(e.target.value)}}></input>
            <br></br>
            <br></br>
            <label htmlFor='password'>Password: </label>
            <input id="password" type="password" name="password" onChange={(e)=>{setPassword(e.target.value)}}></input>
            <br></br>
            <br></br>
            <input type="submit" value='Register'></input>
        </form>  */}


        <div className={styles.login_container}>
            <section class={styles.logins}>
                <header>
                    <h2>Sign Up</h2>
                    
                </header>
                <form className={styles.login_form} onSubmit={registerUser}>
                    <input type="text" className={styles.login_input} placeholder= " Username" onChange={(e)=>{setUsername(e.target.value)}}/>
                    <input type="password" className={styles.login_input} placeholder=" Password" onChange={(e)=>{setPassword(e.target.value)}}/>
                    <input type="text" className={styles.login_input} placeholder=" Email" onChange={(e)=>{setEmail(e.target.value)}}/>
                    <select name="accountGroup" id="accountGroup" placeholder="Account type" className={styles.login_input} onChange={(e)=>{setType(e.target.value)}}>
                        <option value="CNT">CNT</option>    
                        <option value="KTHT">KTHT</option>
                    </select>
                    <div >
                        <button type="submit" className={styles.login_button}>SIGN UP</button>
                    </div> 
                </form>
            </section>
        </div>
        </>
    )
}

export default Register