import { useLocation, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { ColumnsType } from 'antd/es/table';
import styles from "./Home.module.css"
import { useState, useEffect } from 'react';
import dataService from '../../services/data.service';
import authenService from "../../services/authen.service"
import Table from '../../components/Table'
import Modal from '../../components/Modal'
import { BiFirstPage, BiLastPage } from 'react-icons/bi';
import { AiOutlineSortAscending} from 'react-icons/ai';

const Home = ({user, setUser}) => {
    const [data, setData] = useState()
    const [group, setGroup] = useState('none')
    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(1)
    const [inputPage, setInputPage] = useState(1)
    const [update, setUpdate] = useState(0)
    const [modal, setModal] = useState(false)
    const location = useLocation()
    let navigate = useNavigate()
    let tempPage = 1
    
    const rheaders = ['ID', 'IP', 'Hostname','Branch', 'Zone', 'Pop', 'Type', 'Function', 'Model', 'Province', 'Total MAC', 'Smart link', 'Sep', 'Stack', 'Number of pop tail', 'patch ver', 'patch state', 'software ver', 'switch type']
    
    const rkeys = ['id', 'ip', 'hostname','branch', 'zone', 'pop', 'type', 'function', 'model', 'province', 'total_mac', 'smart_link', 'sep', 'stack', 'number_of_pop_tail', 'patch_ver', 'patch_state', 'software_ver', 'switch_type']
    
    const headers = ['ID', 'IP', 'Hostname','Branch', 'Zone', 'Pop', 'Type', 'Function', 'Model', 'Province', 'Total MAC',    'patch state', 'software ver', 'switch type']


    const keys = ['id', 'ip', 'hostname','branch', 'zone', 'pop', 'type', 'function', 'model', 'province', 'total_mac',  'patch_state', 'software_ver', 'switch_type']

    let props = {data, setData, location, navigate, page, setPage, maxPage, setMaxPage, headers, tempPage}

    useEffect( () => {
        setPage(1)
    }, [])

    useEffect( () => {
        if( page < 1){
            setPage(1)
        }
        dataService.getAll(props)
        setUpdate(0)
        axios.get("http://localhost:8000/api/getuser/",  {withCredentials : true})
        .then((res) => {
            setUser(res.data['user']) 
        })

        axios.get("http://localhost:8000/api/getpermission",  {withCredentials : true})
        .then((res) => {
            setGroup(res.data) 
        })

        if( page > maxPage){
            setPage(maxPage)
        }

        setInputPage(page)

     }, [page, update])


    const change_page = (e) => {
        e.preventDefault()
        setPage(e.target[0].value)
    }

    const next_page = (e) => {
        if (page -1 + 2 <= maxPage){
            console.log(page -1 + 2, maxPage)
            setPage(page -1 + 2)
        } else {
            
        }
    }

    const previous_page = (e) => {
        if( page - 1 >= 1){
            setPage(page - 1)
        }
    }

    const last_page = (e) => {
        setPage(maxPage)
    }
    
    const first_page = (e) => {
        setPage(1)
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

            {user ?   
             <>
                <h1 className={styles.title}>
                    Record List
                </h1>
                <br></br>
                <br></br>

            
                {group == 'KTHT' &&  <button className={styles.add_button} onClick={(e) => {navigate('/add')}}>Add new record</button>}
                {/* <p className={styles.page_noti}>Page: {page}</p> */}
                <div className={styles.change_page}>
                <button className={styles.change_button} onClick={first_page}> First</button>
                <button className={styles.change_button} onClick={previous_page}> {'<'} Previous</button>
                <button className={styles.change_button} onClick={next_page}> Next {'>'}</button>
                <button className={styles.change_button} onClick={last_page}> Last {'>>'}</button>
                
                <form onSubmit={change_page} className={styles.page_form}>
                    <label className={styles.page_noti} for="page">(1 - {maxPage}): </label>

                    <input id="page" type="number" name="page" value = {inputPage} onChange={change_input_page} className={styles.page_input}></input>
                    <button type="submit" value="Go" className={styles.change_button}>Go</button>
            </form>
                </div>


            <Table headers = {headers} data = {data} group = {group}  setUpdate={setUpdate} keys={keys} ></Table>
            <br></br> 
            </>  : <> <h1 className={styles.not_login}>You are not logged in</h1> <p className={styles.not_login}>Please log in to continue</p></>}
        </>
    )
}

export default Home