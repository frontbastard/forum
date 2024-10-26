import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import LikesComponent from './LikesComponent.jsx';
import {Box} from '@mui/material';
import {useUser} from '../providers/UserContext.jsx';
import {Delete} from '@mui/icons-material';

function ItemDetailsComponent({item, type, onDelete}) {
  const [user] = useUser()

  return (
    <Box
      component="section"
      className={`${type}-content`}
      id={`${type}-${item.id}`}
      sx={{
        flexDirection: {
          xs: 'column',
          sm: 'initial'
        }
      }}
    >
      <aside className="content-left">
        <Avatar
          alt="Remy Sharp"
          src={`https://api.dicebear.com/9.x/pixel-art/webp?seed=${item.author.email}`}
        />
        <p>{item.author.email}</p>
        <p>Registered: {item.author.date_joined}</p>
        <p>Topics: {item.author.topics_count} /
          Posts: {item.author.posts_count}</p>
      </aside>
      <article className="content-right">
        <header className="content-right-header">
          {
            item.created_at === item.updated_at ?
              item.created_at :
              item.updated_at
          }


          {user && (
            <Delete
              fontSize='medium'
              sx={{cursor: 'pointer'}}
              onClick={onDelete}
            />
        )}
      </header>
      <main className="content-right-main">
        <p className="content-right-text">{item.content}</p>
        {'likes' in item && (
          <LikesComponent
            id={item.id}
            likesCount={item.likes}
            isUserLiked={item.current_user_liked}
          />
        )}
      </main>
    </article>
</Box>
)
}

ItemDetailsComponent.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    content: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
    likes: PropTypes.number,
    current_user_liked: PropTypes.bool,
    author: PropTypes.shape({
      email: PropTypes.string.isRequired,
      date_joined: PropTypes.string.isRequired,
      posts_count: PropTypes.number.isRequired,
      topics_count: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  type: PropTypes.oneOf(['post', 'topic']).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ItemDetailsComponent
