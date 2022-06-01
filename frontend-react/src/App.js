import * as React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "./App.css";
// import Home from "./components/Home"
import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import axios from "axios"
import Header from './components/Header'

function App() {
   return (
    <div>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <br></br>
      <br></br>
    </div>
  );
}

export default App;
