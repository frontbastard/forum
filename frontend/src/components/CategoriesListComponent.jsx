import React, {useState} from 'react';
import List from '@mui/material/List'
import StarIcon from '@mui/icons-material/Star';
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import {Box, Collapse, ListItemIcon} from '@mui/material';
import {Add, ExpandLess, ExpandMore} from '@mui/icons-material';
import TopicsListComponent from './TopicsListComponent.jsx';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {useUser} from '../providers/UserContext.jsx';

function CategoriesListComponent({categories}) {
  const [user] = useUser()
  const [openCategories, setOpenCategories] = useState({});

  const handleClick = (categoryId) => {
    setOpenCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
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
              onClick={() => handleClick(category.id)}
              sx={{border: '1px solid #444', backgroundColor: '#333'}}
            >
              <ListItemIcon>
                <StarIcon sx={{color: '#bbb'}}/>
              </ListItemIcon>
              <ListItemText primary={category.name}/>

              <ListItemButton
                sx={{flexGrow: 'initial'}}
                component={Link}
                to={user ? `/topic-create/${category.id}` : '/login'}
              >
                <Add sx={{color: '#bbb'}}/>
              </ListItemButton>
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
  );
}

CategoriesListComponent.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      topics: PropTypes.array.isRequired,
    })
  ).isRequired
};

export default CategoriesListComponent
