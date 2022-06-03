import { useLocation, useNavigate } from 'react-router-dom'
import { Table } from 'antd'; 
import axios from 'axios'
import { ColumnsType } from 'antd/es/table';
import { useState, useEffect } from 'react';

class dataService {
    mockData(props) {
        const query = { params: {
            total_mac: 119,
            number_of_pop_tail: 0
        }
        }
        axios.get("http://localhost:8000/home/get2/", query)
        .then((res) => {
            if(props.data != res.data.record){
                props.setData(res.data.record);
            }
        })
    }
    getAll(props) {
        axios.get("http://localhost:8000/api/getdata", {
            params: {
                page: props.page
            }
        })
        .then( (res) => {
            props.setData(res.data.record)
            props.setMaxPage(res.data.max_page)
        })
    }

    deleteData(id, setUpdate) {
        axios.get("http://localhost:8000/api/delete", {
            params: {
                id: id
            }
        })
        .then( () => {
            setUpdate(1)
        })
    }

    addData(input, navigate) {
        axios.post("http://localhost:8000/api/add", input)
        .then( (res) => {
            console.log(res.data)
            if(res.data == 'ok'){
                navigate('/')
            } else {
                alert("Fail to add new record")
            }
        })
    }

    updateData(input, navigate) {
        axios.post("http://localhost:8000/api/update", input)
        .then( (res) => {
            console.log(res.data)
            if(res.data == 'ok'){
                navigate('/')
            } else {
                alert("Fail to update record")
            }
        })
    }
}

export default new dataService()