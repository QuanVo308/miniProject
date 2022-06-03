import { Routes, Route, Link, useNavigate } from "react-router-dom";
import styles from "../pages/Home/Home.module.css"
import dataService from "../services/data.service";
export default function Table(props) {
    const navigate = useNavigate()

    const edit = (data) => {
        navigate('/edit', {state: data})
    } 

    const deleteRecord = (data) => {
        console.log("delete ", data.id, props.setUpdate)
        dataService.deleteData(data.id, props.setUpdate)
    }

    return(
        <>
        <table className={styles.table}>
                <thead>
                    <tr>
                        {props.headers.map( (header) => {
                            return <th key={header}>{header}</th>
                        })}
                        {props.group == 'KTHT' && <th key={'edit'}>Edit</th>}
                        {props.group == 'KTHT' && <th key={'delete'}>Delete</th>}
                    </tr>
                </thead>
                <tbody>
                    {props.data && props.data.map((record) => {
                        return <tr>
                            {Object.keys(record).map( (k) => {
                                return <td key={k}>{String(record[k])}</td>
                            })}
                            {props.group == 'KTHT' && <td key={'edit'}><button className={styles.edit_button} onClick={() => {edit(record)}}>edit</button></td>}
                            {props.group == 'KTHT' && <td key={'delete'}><button className={styles.delete_button} onClick={() => {deleteRecord(record)}}>delete</button></td>}
                        </tr>
                    })}
                </tbody>
            </table>
        </>
    )
}