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
        axios.get("http://localhost:8000/home/get2/")
    }
}

export default new dataService()