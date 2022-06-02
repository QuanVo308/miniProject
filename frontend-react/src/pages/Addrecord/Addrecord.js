import { useLocation, useNavigate, useResolvedPath } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios'
import authenService from "../../services/authen.service"

const Addrecord = ({user, setUser}) => {

    return (
        <>
            <h1>NEW RECORD</h1>
            <form>
            <label htmlFor="username">IP: </label>
            <input id="ip" type="text" name="ip"></input>
            </form>
        </>
    )
}

export default Addrecord