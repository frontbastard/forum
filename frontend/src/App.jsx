import './App.scss'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent.jsx';
import Home from './pages/Home.jsx';
import TopicList from './pages/TopicList.jsx';
import Topic from './pages/Topic.jsx';
import Category from './pages/Category.jsx';

function App() {
  return (
    <Router>
      <div className="wrapper">
        <HeaderComponent/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/category/:id" element={<Category/>}/>
          <Route path="/topics" element={<TopicList/>}/>
          <Route path="/topic/:id" element={<Topic/>}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App
