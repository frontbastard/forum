import {useState} from 'react';
import axios from 'axios';
import {USERS_API_BASE} from '../constants/api.jsx';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';
import {Box, Container, Paper, TextField} from '@mui/material';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    try {
      const {data} = await axios.post(`${USERS_API_BASE}/token/`, user, {
        headers: {'Content-Type': 'application/json'},
        withCredentials: true,
      });

      localStorage.clear();
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);

      axios.defaults.headers.common['Authorization'] = `Bearer ${data['access']}`;

      window.location.href = '/';
    } catch (error) {
      console.error('Login error:', error);
      // Handle login error (e.g., show error message to user)
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          <b>Welcome!</b>
        </Typography>
        <Typography variant="body2" align="center" gutterBottom>
          Sign in to continue.
        </Typography>
        <form onSubmit={submit}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Box mt={2} display="flex" justifyContent="center">
            <Button type="submit" variant="contained" color="primary" size="large">
              Log in
            </Button>
          </Box>
        </form>
        <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
          Do not have an account?{' '}
          <Link href="/sign-up">Sign up</Link>
        </Typography>
      </Paper>
    </Container>
  )
}

export default Login;
