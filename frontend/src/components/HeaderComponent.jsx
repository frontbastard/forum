import {grey} from '@mui/material/colors';
import {AppBar, Box, Toolbar, Typography} from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import Button from '@mui/material/Button';
import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

function HeaderComponent() {
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('access') !== null) {
      setIsAuth(true)
    }
  }, [isAuth]);

  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static" sx={{backgroundColor: grey['800']}}>
        <Toolbar>
          <Typography
            variant="h5"
            component={Link}
            noWrap
            to="/"
            sx={{
              mr: 2,
              display: {xs: 'flex'},
              letterSpacing: '.2rem',
              fontWeight: 500,
              color: 'inherit',
              textDecoration: 'none',
              flexGrow: 1,
            }}
          >
            <ChatBubbleOutlineIcon sx={{mr: 1, mt: '4px'}}/>
            Forum
          </Typography>
          {isAuth ?
            <Button color="inherit" href="/logout">Logout</Button> :
            <Button color="inherit" href="/login">Login</Button>
          }
        </Toolbar>
      </AppBar>
    </Box>
  )
    ;
}

export default HeaderComponent
