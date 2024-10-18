// import React from 'react'
import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from "./components/Header.jsx";
import CategoryList from "./components/CategoryList.jsx";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import TopicList from "./components/TipicList.jsx";
import TopicDetail from "./components/TopicDetail.jsx";
import CategoryDetail from "./components/CategoryDetail.jsx";

function App() {
    return (
        <Router>
            <div>
                <Header/>
                <Routes>
                    <Route path="/" element={<CategoryList/>}/>
                    <Route path="/category/:id" element={<CategoryDetail/>}/>
                    <Route path="/topics" element={<TopicList/>}/>
                    <Route path="/topic/:id" element={<TopicDetail/>}/>
                </Routes>
            </div>
        </Router>
    )
}

export default App
