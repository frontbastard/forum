import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import {ListItem, ListItemIcon} from '@mui/material';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import TopicIcon from "@mui/icons-material/Topic";

function SimpleListComponent({items, uriPath, idField, textField}) {
  if (!items || items.length === 0) {
    return <List component='div' disablePadding><ListItemText
      primary='No topics available'/></List>
  }

  return (
    <List>
      {items.map((item) => (
        <ListItem key={item.id} sx={{alignItems: 'flex-start'}}>
          <TopicIcon sx={{mr: 1, color: '#bbb'}}/>
          <Link to={`${uriPath}/${item[idField]}`}>{item[textField]}</Link>
        </ListItem>
      ))}
    </List>
  )
}

SimpleListComponent.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
  uriPath: PropTypes.string.isRequired,
  idField: PropTypes.string.isRequired,
  textField: PropTypes.string.isRequired,
}

export default SimpleListComponent
