import {useState, useEffect} from 'react'
import CategoriesListComponent
  from '../components/CategoriesListComponent.jsx'
import api from '../interceptors/api.js'
import {Box} from '@mui/material';
import Button from '@mui/material/Button';
import {Add} from '@mui/icons-material';
import {Link} from 'react-router-dom';
import {useUser} from '../providers/UserContext.jsx';

function Home() {
  const [user] = useUser()
  const [categories, setCategories] = useState([])

  useEffect(() => {
    api.get('/forum/categories/')
      .then(response => setCategories(response.data.results))
      .catch(error => console.error('Error fetching categories:', error))
  }, [])

  if (!categories.length) return <p>Loading categories...</p>

  return (
    <div>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <h1>Forum Categories</h1>
        {user && user.is_staff && (
          <Button variant="outlined" component={Link} to="/category-create">
            <Add fontSize='large'/>
          </Button>
        )}
      </Box>
      <CategoriesListComponent categories={categories}/>
    </div>
  )
}

export default Home
