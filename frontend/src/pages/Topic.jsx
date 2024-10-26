import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import ItemDetailsComponent from '../components/ItemDetailsComponent.jsx'
import api from '../interceptors/api.js';
import {Box, TextField} from '@mui/material';
import Button from '@mui/material/Button';

function Topic() {
  const [topic, setTopic] = useState(null)
  const [posts, setPosts] = useState(null)
  const [content, setContent] = useState('')
  const {id} = useParams()

  const submit = async (e) => {
    e.preventDefault()

    const post = {
      topic: topic.id,
      content,
    }

    try {
      const response = await api.post('/forum/posts/', post)
      setPosts([...posts, response.data])
    } catch (error) {
      console.error('Topic add error:', error)
    }
  }

  useEffect(() => {
    api.get(`/forum/topics/${id}/`)
      .then(response => {
        setTopic(response.data)
        setPosts(response.data.posts)
      })
      .catch(error => console.error('Error fetching topic:', error))
  }, [id])

  if (!topic) return <p>Loading topic...</p>

  return (
    <div>
      <h2>{topic.name}</h2>
      <ItemDetailsComponent item={topic} type="topic"/>
      <h2>Posts:</h2>
      {posts.map(post => (
        <ItemDetailsComponent key={post.id} item={post} type="post"/>
      ))}
      <form onSubmit={submit}>
        <TextField
          multiline
          rows={4}
          label="Post Description"
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
            Create Post
          </Button>
        </Box>
      </form>
    </div>
  )
}

export default Topic
