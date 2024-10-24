import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import ItemDetails from '../components/ItemDetailsComponent.jsx'
import api from '../interceptors/api.js';

function Topic() {
  const [topic, setTopic] = useState(null)
  const {id} = useParams()

  useEffect(() => {
    api.get(`/forum/topics/${id}/`)
      .then(response => setTopic(response.data))
      .catch(error => console.error('Error fetching topic:', error))
  }, [id])

  if (!topic) return <p>Loading topic...</p>

  return (
    <div>
      <h2>{topic.name}</h2>
      <ItemDetails items={topic} type="topic"/>
      <h2>Posts:</h2>
      {topic.posts.map(post => (
        <ItemDetails key={post.id} items={post} type="post"/>
      ))}
    </div>
  )
}

export default Topic
