import { useLocation, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { ColumnsType } from 'antd/es/table';
import styles from "./Home.module.css"
import { useState, useEffect } from 'react';
import dataService from '../../services/data.service';
import authenService from "../../services/authen.service"
import Table from '../../components/Table'

const Home = ({user, setUser}) => {
    const [data, setData] = useState()
    //const [user, setUser] = useState()
    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(1)
    const [inputPage, setInputPage] = useState(1)
    const location = useLocation()
    let navigate = useNavigate()
    let tempPage = 1
    
    const headers = ['ID', 'IP', 'Hostname','Branch', 'Zone', 'Pop', 'Type', 'Function', 'Model', 'Province', 'Total MAC', 'Smart link', 'Sep', 'Stack', 'Number of pop tail', 'patch ver', 'patch state', 'software ver', 'switch type']

    let props = {data, setData, location, navigate, page, setPage, maxPage, setMaxPage, headers, tempPage}

    useEffect( () => {
        setPage(1)
    }, [])

    useEffect( () => {
        if( page < 1){
            setPage(1)
        }
        dataService.getAll(props)

        axios.get("http://localhost:8000/api/getuser/",  {withCredentials : true})
        .then((res) => {
            setUser(res.data['user']) 
        })

        if( page > maxPage){
            console.log("exceed", page)
            setPage(maxPage)
        }

     }, [page])

    const change_page = (e) => {
        e.preventDefault()
        setPage(e.target[0].value)
    }

    const next_page = (e) => {
        if ( page <= maxPage){
            setPage(page -1 + 2)
        } else {
            
        }
    }

    const previous_page = (e) => {
        if( page >= 1){
            setPage(page - 1)
        }
    }
    
    const change_input_page = (e) => {
        if(e.target.value < 1){
            setInputPage(1)
        }
        else if(e.target.value > maxPage){
            setInputPage(maxPage)
        } else {
            setInputPage(e.target.value)
        }
        
    }

    return (
        <>
            <h1>
                Home page {user && 'as ' + user}
            </h1>
            <br></br>
            <br></br>
            <form onSubmit={change_page}>
                <label for="page">Page (1 - {maxPage}): </label>
                <input id="page" type="number" name="page" value = {inputPage} onChange={change_input_page}></input>
                <input type="submit" value="Go" />
            </form>
                <button onClick={previous_page}> Previous</button>
                <button onClick={next_page}> Next</button>
            <p>Page: {page}</p>
            <button onClick={(e) => {navigate('/add')}}>Add</button>
            <Table headers = {headers} data = {data} ></Table>
            <p>Page: {page}</p>
            <form onSubmit={change_page}>
                <label for="page">Page (1 - {maxPage}): </label>
                <input id="page" type="number" name="page" value = {inputPage} onChange={change_input_page}></input>
                <input type="submit" value="Go" />
            </form>
                <button onClick={previous_page}> Previous</button>
                <button onClick={next_page}> Next</button>
        </>
    )
}

export default Home