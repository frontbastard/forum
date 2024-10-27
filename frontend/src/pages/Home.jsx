import {useState, useEffect} from 'react'
import CategoriesListComponent
  from '../components/CategoriesListComponent.jsx'
import api from '../interceptors/api.js'
import {Box, Typography} from '@mui/material';
import Button from '@mui/material/Button';
import {Add} from '@mui/icons-material';
import {Link} from 'react-router-dom';
import {useUser} from '../providers/UserContext.jsx';
import {handleError} from '../utils/errorHandler.js'

function Home() {
  const [user] = useUser()
  const [categories, setCategories] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    api.get('/forum/categories/')
      .then(response => setCategories(response.data.results))
      .catch(error => console.error('Error fetching categories:', error))
  }, [])

  const handleDeleteCategory = async (e, id) => {
    e.preventDefault()

    try {
      await api.delete(`/forum/categories/${id}/`)
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.id !== id))
    } catch (error) {
      handleError(error, setError)
      console.error('Category remove error:', error)
    }
  }

  if (!categories.length) return <p>Loading categories...</p>

  return (
    <div>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <h1>Forum Categories</h1>
        {error && <Typography color="error">{error}</Typography>}
        {user?.is_staff && (
          <Button variant="outlined" component={Link} to="/category-create">
            <Add fontSize='large'/> Add category
          </Button>
        )}
      </Box>
      <CategoriesListComponent
        categories={categories}
        onDelete={(e, id) => handleDeleteCategory(e, id)}
      />
    </div>
  )
}

export default Home
