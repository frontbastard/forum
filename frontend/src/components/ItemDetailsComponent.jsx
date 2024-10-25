import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import VotesComponent from './VotesComponent.jsx';

function ItemDetailsComponent({items, type}) {
  return (
    <section className={`${type}-content`} id={`${type}-${items.id}`}>
      <aside className="content-left">
        <Avatar alt="Remy Sharp"
                src={`https://api.dicebear.com/9.x/pixel-art/webp?seed=${items.author.email}`}/>
        <p>{items.author.email}</p>
        <p>Registered: {items.author.date_joined}</p>
        <p>Topics: {items.author.topics_count} /
          Posts: {items.author.posts_count}</p>
      </aside>
      <article className="content-right">
        <header className="content-right-header">
          {
            items.created_at === items.updated_at ?
              items.created_at :
              items.updated_at
          }
        </header>
        <main className="content-right-main">
          <p className="content-right-text">{items.content}</p>
          {'votes_sum' in items && (
            <VotesComponent id={items.id} votes_sum={items.votes_sum}/>
          )}
        </main>
      </article>
    </section>
  )
}

ItemDetailsComponent.propTypes = {
  items: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    content: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
    votes_sum: PropTypes.number,
    author: PropTypes.shape({
      email: PropTypes.string.isRequired,
      date_joined: PropTypes.string.isRequired,
      posts_count: PropTypes.number.isRequired,
      topics_count: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  type: PropTypes.oneOf(['post', 'topic']).isRequired,
};

export default ItemDetailsComponent
