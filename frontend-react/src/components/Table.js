import { Routes, Route, Link, useNavigate } from "react-router-dom";
import styles from "../pages/Home/Home.module.css"
export default function Table(props) {
    return(
        <>
        <table className={styles.table}>
                <thead>
                    <tr>
                        {props.headers.map( (header) => {
                            return <th key={header}>{header}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {props.data && props.data.map((record) => {
                        return <tr>
                            {Object.keys(record).map( (k) => {
                                return <td ket={k}>{String(record[k])}</td>
                            })}
                        </tr>
                    })}
                </tbody>
            </table>
        </>
    )
}