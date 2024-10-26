import './App.scss'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import HeaderComponent from './components/HeaderComponent.jsx'
import {ThemeProvider} from '@mui/material/styles'
import {createTheme} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Home from './pages/Home.jsx'
import TopicCreate from './pages/TopicCreate.jsx'
import Topic from './pages/Topic.jsx'
import Category from './pages/Category.jsx'
import Login from './pages/Login.jsx'
import {Logout} from './pages/Logout.jsx'
import Profile from './pages/Profile.jsx'
import {UserProvider} from './providers/UserContext.jsx'
import Register from './pages/Register.jsx'
import {Box, Container} from '@mui/material';
import CategoryCreate from './pages/CategoryCreate.jsx';
import FooterComponent from './components/FooterComponent.jsx';

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
          <Box
            sx={{display: 'flex', flexDirection: 'column', height: '100%'}}
          >
            <HeaderComponent/>
            <Container sx={{flexGrow: 1}}>
              <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/logout" element={<Logout/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/category/:id" element={<Category/>}/>
                <Route path="/category-create" element={<CategoryCreate/>}/>
                <Route path="/topics/:id" element={<Topic/>}/>
                <Route path="/topic-create/:categoryId"
                       element={<TopicCreate/>}/>
              </Routes>
            </Container>
            <FooterComponent/>
          </Box>
        </Router>
      </UserProvider>
    </ThemeProvider>
  )
}

export default App
