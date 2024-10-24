import {useState} from 'react'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import {Link} from 'react-router-dom'
import {Box, Container, Paper, TextField} from '@mui/material'
import api from '../interceptors/api.js'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submit = async (e) => {
    e.preventDefault()

    const user = {
      email,
      password,
    }

    try {
      const response = await api.post('/users/token/', user)
      const {access, refresh} = response.data

      localStorage.setItem('access', access)
      localStorage.setItem('refresh', refresh)

      window.location.href = '/'
    } catch (error) {
      console.error('Login error:', error)
    }
  }

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

export default Login
