import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import {ListItemIcon} from '@mui/material';
import TopicIcon from '@mui/icons-material/Topic';
import {Link} from 'react-router-dom';

function TopicsListComponent({topics}) {
  if (!topics || topics.length === 0) {
    return <List component="div" disablePadding><ListItemText
      primary="No topics available"/></List>;
  }

  return (
    <List component="div" disablePadding>
      {topics.map(topic => (
        <ListItemButton
          key={topic.id}
          sx={{pl: 4, border: '1px solid #444'}}
          component={Link}
          to={`/topic/${topic.id}`}
        >
          <ListItemIcon>
            <TopicIcon sx={{color: '#bbb'}}/>
          </ListItemIcon>
          <ListItemText primary={topic.name || topic.id}/>
          {topic.posts_count} posts
        </ListItemButton>
      ))}
    </List>
  )
}

TopicsListComponent.propTypes = {
  topics: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      posts_count: PropTypes.number.isRequired,
    })
  ).isRequired
};

export default TopicsListComponent
