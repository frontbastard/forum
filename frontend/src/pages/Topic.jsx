import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {API_BASE} from '../constants/api.jsx';
import ItemDetails from '../components/ItemDetailsComponent.jsx';

function Topic() {
  const [topic, setTopic] = useState(null)
  const {id} = useParams()

  useEffect(() => {
    axios.get(`${API_BASE}/forum/topics/${id}/`)
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
