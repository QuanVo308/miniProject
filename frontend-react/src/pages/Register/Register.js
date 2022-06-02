import { useLocation, useNavigate, useResolvedPath } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios'
import authenService from "../../services/authen.service"
import styles from "./Register.module.css"

const Register = ({user, setUser}) => {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
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
                    <h2>MiniProject</h2>
                    <h4>Sign Up</h4>
                </header>
                <form className={styles.login_form}>
                    <input type="text" className={styles.login_input} placeholder= " Username"/>
                    <input type="password" className={styles.login_input} placeholder=" Password" />
                    <input type="text" className={styles.login_input} placeholder=" Email" />
                    <select name="accountGroup" id="accountGroup" placeholder="Account type" className={styles.login_input}>
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