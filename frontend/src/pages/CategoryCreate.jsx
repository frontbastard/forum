import {useState} from 'react';
import api from '../interceptors/api.js';
import {Box, Container, Paper, TextField} from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';
import {handleError} from '../utils/errorHandler.js'

function CategoryCreate() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()

    const category = {
      name,
      description,
    }

    try {
      await api.post('/forum/categories/', category)
      navigate('/')
    } catch (error) {
      handleError(error, setError)
      console.error('Category add error:', error)
    }
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Add Category
        </Typography>
        <Typography variant="body2" align="center" gutterBottom>
          Please enter the name and description of the category
        </Typography>
        <form onSubmit={submit}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            multiline
            rows={4}
            label="Description"
            variant="outlined"
            fullWidth
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          {error && <Typography color="error">{error}</Typography>}
          <Box mt={2} display="flex" justifyContent="center">
            <Button type="submit" variant="contained" color="primary" size="large">
              Create Category
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  )
}

export default CategoryCreate
