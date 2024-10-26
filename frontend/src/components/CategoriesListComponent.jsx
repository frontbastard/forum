import React, {useState} from 'react';
import List from '@mui/material/List'
import StarIcon from '@mui/icons-material/Star';
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import {Collapse, ListItemIcon} from '@mui/material';
import {ExpandLess, ExpandMore} from '@mui/icons-material';
import TopicsListComponent from './TopicsListComponent.jsx';
import PropTypes from 'prop-types';

function CategoriesListComponent({categories}) {
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
          <ListItemButton
            onClick={() => handleClick(category.id)}
            sx={{border: '1px solid #444', backgroundColor: '#333'}}
          >
            <ListItemIcon>
              <StarIcon sx={{color: '#bbb'}}/>
            </ListItemIcon>
            <ListItemText primary={category.name}/>
            {openCategories[category.id] ? <ExpandLess/> : <ExpandMore/>}
          </ListItemButton>
          <Collapse in={!openCategories[category.id]} timeout="auto"
                    unmountOnExit>
            <TopicsListComponent
              topics={category.topics}
              categoryId={category.id}
            />
          </Collapse>
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
