import { useLocation, useNavigate } from 'react-router-dom'
import { Table } from 'antd'; 
import axios from 'axios'
import { ColumnsType } from 'antd/es/table';
import styles from "./Home.module.css"
import { useState, useEffect } from 'react';
import dataService from '../../services/data.service';

const Home = () => {
    const [data, setData] = useState()
    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(1)
    const location = useLocation()
    let navigate = useNavigate()
    

    let props = {data, setData, location, navigate, page, setPage, maxPage, setMaxPage}

     useEffect( () => {
        setPage(1)
        dataService.mockData(props)
     }, [])


    const clickHandler = (e) => {
        console.log(e.target.value)
        navigate(e.target.value)
    }

    const headers = ['ID', 'IP', 'Hostname','Branch', 'Zone', 'Pop', 'Type', 'Function', 'Model', 'Province', 'Total MAC', 'Smart link', 'Sep', 'Stack', 'Number of pop tail', 'patch ver', 'patch state', 'software ver', 'switch type']
    
    const test = async () => {
        const query = { params: {
          total_mac: 119,
          number_of_pop_tail: 0
        }
          
        }
        const res = await axios.get("http://localhost:8000/home/get2/", query)
        .then((res) => {
        const data = res.data.record;
        console.log(data[0])
        return data
        })
    }
    const test2 = () => {
        axios.get("http://localhost:8000/api/getdata", {
            params: {
                page: 7
            }
        })
        .then( (res) => {
            console.log(res.data.max_page)
        })
    }

    return (
        <>
            <table className={styles.table}>
                <thead>
                    <tr>
                        {headers.map( (header) => {
                            return <th key={header}>{header}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((record) => {
                        return <tr>
                            {Object.keys(record).map( (k) => {
                                return <td>{String(record[k])}</td>
                            })}
                        </tr>
                    })}
                </tbody>
            </table>
            <h1>
                This is Home page
                {location.pathname}
            </h1>
            <button onClick={clickHandler} value = "/login"> Login</button>
            <button onClick={test2}> test2</button>
        </>
    )
}

export default Home

{/* <td>{record.id}</td>
<td>{record.ip}</td>
<td>{record.hostname}</td>
<td>{record.branch}</td>
<td>{record.zone}</td>
<td>{record.pop}</td>
<td>{record.type}</td>
<td>{record.function}</td>
<td>{record.model}</td>
<td>{record.province}</td>  */}