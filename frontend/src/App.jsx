import './App.scss'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import HeaderComponent from './components/HeaderComponent.jsx'
import {ThemeProvider} from '@mui/material/styles'
import {createTheme} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Home from './pages/Home.jsx'
import TopicList from './pages/TopicList.jsx'
import Topic from './pages/Topic.jsx'
import Category from './pages/Category.jsx'
import Login from './pages/Login.jsx'
import {Logout} from './pages/Logout.jsx'
import Profile from './pages/Profile.jsx'
import {UserProvider} from './providers/UserContext.jsx'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#242424',
    }
  },
})

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      <UserProvider>
        <Router>
          <div className="wrapper">
            <HeaderComponent/>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/logout" element={<Logout/>}/>
              <Route path="/profile" element={<Profile/>}/>
              <Route path="/category/:id" element={<Category/>}/>
              <Route path="/topics" element={<TopicList/>}/>
              <Route path="/topics/:id" element={<Topic/>}/>
            </Routes>
          </div>
        </Router>
      </UserProvider>
    </ThemeProvider>
  )
}

export default App
