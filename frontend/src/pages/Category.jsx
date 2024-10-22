import {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';
import {FORUM_API_BASE} from '../constants/api.jsx';

function Category() {
  const [category, setCategory] = useState(null)
  const {id} = useParams()

  useEffect(() => {
    axios.get(`${FORUM_API_BASE}/categories/${id}`)
      .then(response => setCategory(response.data))
      .catch(error => console.error('Error fetching category:', error))
  }, [id]);

  if (!category) return <p>Loading category...</p>

  return (
    <div>
      <h1>{category.name}</h1>
      <p>{category.description}</p>
      <h2>Topics:</h2>
      {category.topics.map(topic => (
        <div key={topic.id}>
          <Link to={`/topic/${topic.id}`}>{topic.name}</Link>
        </div>
      ))}
    </div>
  )
}

export default Category
