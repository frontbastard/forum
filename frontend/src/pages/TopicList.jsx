import {Link} from 'react-router-dom'
import {useEffect, useState} from 'react'
import api from '../interceptors/api.js';

function TopicList() {
  const [topics, setTopics] = useState([])

  useEffect(() => {
    api.get('/forum/topics/')
      .then(response => setTopics(response.data.results))
      .catch(error => console.error('Error fetching topics:', error))
  }, [])

  if (!topics.length) return <p>Loading topics...</p>

  return (
    <div>
      <h1>Topics</h1>
      <ul>
        {topics.map(topic => (
          <li key={topic.id}>
            <Link to={`/topic/${topic.id}`}>{topic.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TopicList
