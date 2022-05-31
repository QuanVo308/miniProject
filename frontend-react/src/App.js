import * as React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./components/Home"
import Login from "./components/Login"
import axios from "axios"

function App() {

  const test = async () => {
    const query = { params: {
      total_mac: 5070,
      number_of_pop_tail: 0
    }
      
    }
    const res = await axios.get("http://localhost:8000/home/get2/", query)
    .then((res) => {
      for(let i = 0; i < res.data.record.length; i++){
        console.log(res.data.record[i].id)
      }
    })
  }

  return (
    <div>
      <h1>Mini Project</h1>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <button onClick={test}>test</button>
    </div>
  );
}

export default App;
