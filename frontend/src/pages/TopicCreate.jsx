import {useState} from 'react';
import api from '../interceptors/api.js';
import {Box, Container, Paper, TextField} from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {useNavigate, useParams} from 'react-router-dom';
import {useUser} from '../providers/UserContext.jsx';

function TopicCreate() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [content, setContent] = useState('')
  const [user] = useUser()
  const {categoryId} = useParams()

  const submit = async (e) => {
    e.preventDefault()

    const topic = {
      name,
      content,
      author: user.id,
      category: Number(categoryId)
    }

    try {
      const response = await api.post('/forum/topics/', topic)
      navigate(`/topics/${response.data.id}/`)
    } catch (error) {
      console.error('Topic add error:', error)
    }
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{padding: 4, marginTop: 8}}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          <b>Add Topic</b>
        </Typography>
        <Typography variant="body2" align="center" gutterBottom>
          Please enter the name and description of the topic
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
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <Box mt={2} display="flex" justifyContent="center">
            <Button
              type="submit" variant="contained" color="primary"
              size="large"
            >
              Create Topic
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  )
}

export default TopicCreate
