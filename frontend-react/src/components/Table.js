import { Routes, Route, Link, useNavigate } from "react-router-dom";
// import styleB from 'bootstrap/dist/css/bootstrap.min.css';
import styles from "../pages/Home/Home.module.css"
// import 'bootstrap/dist/css/bootstrap.min.css';
import dataService from "../services/data.service";
import { useState, useEffect } from 'react';
import DelteModal from "./DeleteModal"
import EditModal from "./EditModal"
import formStyles from "../theme/DeleteModal.module.css"
import { BiFirstPage, BiLastPage } from 'react-icons/fa';
import { AiOutlineSortAscending, AiOutlineSortDescending} from 'react-icons/ai';



export default function Table(props) {
    const navigate = useNavigate()

    const [deleteModal, setDeleteModal] = useState(false)

    const [editModal, setEditModal] = useState(false)

    const [deleteData, setDeleteData] = useState()

    const [editData, setEditData] = useState()

    const [ascID, setAscID] = useState(true)
    const [ascPS, setAscPS] = useState(false)

    useEffect( () => {
        setDeleteModal(false)
        // setEditData(props.data[1])
        // console.log("edit", editData.id)
    },[editData])

    
    const showDeleteModal = () => {
        setDeleteModal(true)
    }

    const hideDeleteModal = () => {
        setDeleteModal(false)
    }

    const showEditModal = () => {
        setEditModal(true)
    }

    const hideEditModal = () => {
        setEditModal(false)
    }

    const edit = (data) => {    
        console.log("data", data.id)
        setEditModal(true)
        setEditData(data)
        // navigate('/edit', {state: data})
    } 

    const setSortID = (e, header) => {
        if(ascID){
            props.data.sort( (a,b) => b.id - a.id) 
        } else {
            props.data.sort( (a,b) => a.id - b.id)
        }
        setAscID( prev => !prev)
    }

    const setSortPS = (header) => {
        // header = String(header)
        console.log("e ", props.keys[props.headers.indexOf(header)])
        console.log("e ", props.data[1][props.keys[props.headers.indexOf(header)]])
        if(ascPS){
            props.data.sort( (a,b) => String(a[props.keys[props.headers.indexOf(header)]]).localeCompare(String(b[props.keys[props.headers.indexOf(header)]])) )
        } else {
            props.data.sort( (a,b) => String(b[props.keys[props.headers.indexOf(header)]]).localeCompare(String(a[props.keys[props.headers.indexOf(header)]])))
        }
        setAscPS( prev => !prev)
        console.log("ps")
    }

    const deleteRecord = (data) => {
        setDeleteData(data)
        setDeleteModal(true)
        // console.log("delete ", data.id, props.setUpdate)
        // setEditModal(true)
        // const confirmBox = window.confirm(
        //     "Do you really want to delete this record?"
        // )
        // if (confirmBox === true) {
        //     dataService.deleteData(data.id, props.setUpdate)
        // }
    }



    return(
        <div className={styles.table_container}>
            <DelteModal show={deleteModal} handleClose={hideDeleteModal} record={deleteData}  update={props.setUpdate}>
            
            </DelteModal >

            <EditModal show={editModal} handleClose={hideEditModal} record={editData} setRecord={setEditData} update={props.setUpdate}>
                
            </EditModal>
        <div className={styles.test}>
        <table className={styles.table}>
                <thead>
                    <tr>
                        {props.headers.map( (header) => {
                            return <th key={header} onClick={header == 'ID' ? setSortID :() => {setSortPS(header)} }>{header} {header == "ID" ? ascID == true ? <AiOutlineSortAscending/> : <AiOutlineSortDescending/> :  ascPS !== true ? <AiOutlineSortAscending/> : <AiOutlineSortDescending/> } </th>
                        })}
                        {props.group == 'KTHT' && <th key={'edit'}>Edit</th>}
                        {props.group == 'KTHT' && <th key={'delete'}>Delete</th>}
                    </tr>
                </thead>
                <tbody className={styles.tbody}>
                    {props.data && props.data.map((record) => {
                        return <tr>
                            {props.keys.map( (k) => {
                                return <td key={k}>{String(record[k])}</td>
                            })}
                            {props.group == 'KTHT' && <td key={'edit'}><button className={styles.edit_button} onClick={() => {edit(record)}}>edit</button></td>}
                            {props.group == 'KTHT' && <td key={'delete'}><button className={styles.delete_button} onClick={() => {deleteRecord(record)}}>delete</button></td>}
                        </tr>
                    })}
                </tbody>
            </table>
            </div>
            
        </div>
    )
}