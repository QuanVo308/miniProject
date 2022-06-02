import * as React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "./App.module.css";
// import Home from "./components/Home"
import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import Addrecord from "./pages/Addrecord/Addrecord";
import axios from "axios"
import Header from './components/Header'
import { useState, useEffect } from 'react';

function App() {
  const [user, setUser] = useState()


  return (
    <div>
      <Header user={user} setUser={setUser}></Header>
      <Routes>
        <Route path="/" element={<Home user={user} setUser={setUser}/>} />
        <Route path="/login" element={<Login user={user} setUser={setUser}/>} />
        <Route path="/register" element={<Register user={user} setUser={setUser}/>} />
        <Route path="/add" element={<Addrecord user={user} setUser={setUser}/>} />
      </Routes>
      <br></br>
      <br></br>
    </div>
  );
}

export default App;
