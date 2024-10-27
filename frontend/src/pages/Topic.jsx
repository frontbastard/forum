import {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import ItemDetailsComponent from '../components/ItemDetailsComponent.jsx'
import api from '../interceptors/api.js'
import {Box, TextField, Typography} from '@mui/material'
import Button from '@mui/material/Button'
import {useUser} from '../providers/UserContext.jsx'
import {handleError} from '../utils/errorHandler.js'

function Topic() {
  const navigate = useNavigate()
  const [user] = useUser()
  const [topic, setTopic] = useState(null)
  const [posts, setPosts] = useState(null)
  const [content, setContent] = useState('')
  const {topicId} = useParams()
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()

    if (!user) {
      navigate('/login')
    }

    const post = {
      topic: topic.id,
      content,
    }

    try {
      const response = await api.post('/forum/posts/', post)
      setPosts([...posts, response.data])
      setContent('')
    } catch (error) {
      handleError(error, setError)
      console.error('Topic add error:', error)
    }
  }

  const handleDeleteTopic = async (e, id) => {
    e.preventDefault()

    try {
      await api.delete(`/forum/topics/${id}/`)
      navigate('/')
    } catch (error) {
      handleError(error, setError)
      console.error('Topic remove error:', error)
    }
  }

  const handleDeletePost = async (e, id) => {
    e.preventDefault()

    try {
      await api.delete(`/forum/posts/${id}/`)
      setPosts((prevPosts) =>
        prevPosts.filter((post) => post.id !== id))
    } catch (error) {
      handleError(error, setError)
      console.error('Post remove error:', error)
    }
  }

  const handleEditTopic = async (e, id, content) => {
    e.preventDefault()

    try {
      const response = await api.patch(`/forum/topics/${id}/`, {
        content
      })

      setTopic(prevTopic => ({
        ...prevTopic,
        content: response.data.content
      }))
    } catch (error) {
      handleError(error, setError)
      console.error('Topic edit error:', error)
    }
  }

  const handleEditPost = async (e, id, content) => {
    e.preventDefault()

    try {
      const response = await api.patch(`/forum/posts/${id}/`, {
        content
      })

      setPosts(prevPosts => prevPosts.map(
        post => post.id === id ? {...post, ...response.data} : post
      ))
    } catch (error) {
      handleError(error, setError)
      console.error('Post edit error:', error)
    }
  }

  useEffect(() => {
    api.get(`/forum/topics/${topicId}/`)
      .then(response => {
        setTopic(response.data)
        setPosts(response.data.posts)
      })
      .catch(error => {
        handleError(error, setError)
        console.error('Error fetching topic:', error)
      })
  }, [topicId])

  if (!topic) return <p>Loading topic...</p>

  return (
    <div>
      {error && <Typography color="error">{error}</Typography>}
      <h2>{topic.name}</h2>
      <ItemDetailsComponent
        item={topic} type="topic"
        onDelete={(e, id) => handleDeleteTopic(e, id)}
        onEdit={(e, id, content) => handleEditTopic(e, id, content)}
      />
      <h2>Posts:</h2>
      {posts.map(post => (
        <ItemDetailsComponent
          key={post.id} item={post} type="post"
          onDelete={(e, id) => handleDeletePost(e, id)}
          onEdit={(e, id, content) => handleEditPost(e, id, content)}
        />
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
