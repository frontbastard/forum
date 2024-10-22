import {useState, useEffect} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {FORUM_API_BASE} from "../constants/api.jsx";
import CategoriesListComponent
  from "../components/CategoriesListComponent.jsx";

function Home() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    axios.get(`${FORUM_API_BASE}/categories/`)
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
