import {useState, useEffect} from 'react'
import CategoriesListComponent
  from '../components/CategoriesListComponent.jsx'
import api from '../interceptors/api.js'

function Home() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    api.get('/forum/categories/')
      .then(response => setCategories(response.data.results))
      .catch(error => console.error('Error fetching categories:', error))
  }, [])

  if (!categories.length) return <p>Loading categories...</p>

  return (
    <div>
      <h1>Forum Categories</h1>
      <CategoriesListComponent categories={categories}/>
    </div>
  )
}

export default Home
