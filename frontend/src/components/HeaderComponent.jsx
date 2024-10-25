import {grey} from '@mui/material/colors';
import {AppBar, Box, Container, Toolbar, Typography} from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';
import {useUser} from '../providers/UserContext.jsx';
import Avatar from '@mui/material/Avatar';

function HeaderComponent() {
  const [user] = useUser(false)

  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static" sx={{backgroundColor: grey['800']}}>
        <Container>
          <Toolbar disableGutters>
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
            {user ? (
                <>
                  <Avatar
                    component={Link}
                    to="/profile"
                    alt="Remy Sharp"
                    src={`https://api.dicebear.com/9.x/pixel-art/webp?seed=${user.email}`}
                    sx={{mr: 1}}
                  />
                  <Button color="inherit" href="/logout">Logout</Button>
                </>
              ) :
              <Button color="inherit" href="/login">Login</Button>
            }
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  )
    ;
}

export default HeaderComponent
