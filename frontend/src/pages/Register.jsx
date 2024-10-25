import {useState} from 'react'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import {Link} from 'react-router-dom'
import {Box, Container, Paper, TextField} from '@mui/material'
import api, {setAccessToken} from '../interceptors/api.js'

function Register() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()

    const user = {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    } else {
      setError('')
    }

    try {
      const response = await api.post('/users/register/', user)
      const {access} = response.data

      setAccessToken(access)

      window.location.href = '/'
    } catch (error) {
      console.error('Register error:', error)
    }
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{padding: 4, marginTop: 8}}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          <b>Registration</b>
        </Typography>
        <Typography variant="body2" align="center" gutterBottom>
          Sign up to continue.
        </Typography>
        <form onSubmit={submit}>
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {error && <Typography color="error">{error}</Typography>}
          <Box mt={2} display="flex" justifyContent="center">
            <Button type="submit" variant="contained" color="primary"
                    size="large">
              Register
            </Button>
          </Box>
        </form>
        <Typography variant="body2" sx={{mt: 2, textAlign: 'center'}}>
          Already have an account? <Link to="/login">Sign in</Link>
        </Typography>
      </Paper>
    </Container>
  )
}

export default Register
