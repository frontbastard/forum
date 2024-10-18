// import React from 'react'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from "./components/Header.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
        <div>
            <Header/>
            {/*<Routes>*/}
            {/*    <Route path="/" element={<CategoryList/>}/>*/}
            {/*</Routes>*/}
        </div>
    </Router>
  )
}

export default App
