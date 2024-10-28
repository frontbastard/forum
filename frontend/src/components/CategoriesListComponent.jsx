import React, {useState} from 'react'
import List from '@mui/material/List'
import StarIcon from '@mui/icons-material/Star'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import {Box, Collapse, ListItemIcon} from '@mui/material'
import {Add, Delete, ExpandLess, ExpandMore} from '@mui/icons-material'
import TopicsListComponent from './TopicsListComponent.jsx'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {useUser} from '../providers/UserContext.jsx'

function CategoriesListComponent({categories, onDelete}) {
  const [user] = useUser()
  const [openCategories, setOpenCategories] = useState({})

  const handleToggleCategory = (categoryId) => {
    setOpenCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }))
  }

  return (
    <List
      sx={{width: '100%'}}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {categories.map(category => (
        <React.Fragment key={category.id}>
          <Box sx={{mb: 2}}>
            <ListItemButton
              onClick={() => handleToggleCategory(category.id)}
              sx={{border: '1px solid #444', backgroundColor: '#333'}}
            >
              <ListItemIcon>
                <StarIcon color="#bbb"/>
              </ListItemIcon>
              <ListItemText
                primary={category.name}
                secondary={category.description}
              />

              {user?.is_staff && (
                <ListItemButton
                  sx={{flexGrow: 'initial', mr: 1}}
                  onClick={(e) => onDelete(e, category.id)}
                >
                  <Delete color='#bbb' sx={{mr: 1}}/>
                  <ListItemText
                    sx={{
                      display: {
                        xs: 'none',
                        sm: 'block'
                      }
                    }}
                  >Delete category</ListItemText>
                </ListItemButton>
              )}

              {user && (
                <ListItemButton
                  sx={{flexGrow: 'initial', mr: 1}}
                  component={Link}
                  to={user ? `/topic-create/${category.id}` : '/login'}
                >
                  <Add color='#bbb' sx={{mr: 1}}/>
                  <ListItemText
                    sx={{
                      display: {
                        xs: 'none',
                        sm: 'block'
                      }
                    }}
                  >Add topic</ListItemText>
                </ListItemButton>
              )}
              {openCategories[category.id] ? <ExpandLess/> : <ExpandMore/>}
            </ListItemButton>
            <Collapse
              in={!openCategories[category.id]}
              timeout="auto"
              unmountOnExit
            >
              <TopicsListComponent
                topics={category.topics}
                categoryId={category.id}
              />
            </Collapse>
          </Box>
        </React.Fragment>
      ))}
    </List>
  )
}

CategoriesListComponent.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      topics: PropTypes.array.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default CategoriesListComponent
