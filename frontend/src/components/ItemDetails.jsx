import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

function ContentItem({data, type}) {
    return (
        <section className={`${type}-content`} id={`${type}-${data.id}`}>
            <aside className="content-left">
                <Avatar alt="Remy Sharp"
                        src={`https://api.dicebear.com/9.x/pixel-art/webp?seed=${data.author.email}`}/>
                <p>{data.author.email}</p>
                <p>
                    Registered: dd/mm/yyyy
                </p>
                <p>
                    Posts: POSTS_QTY
                </p>
            </aside>
            <article className="content-right">
                <header className="content-right-header">
                    {
                        data.created_at === data.updated_at ?
                            data.created_at :
                            data.updated_at
                    }
                </header>
                <main className="content-right-main">
                    {data.name && <h2>{data.name}</h2>}
                    <p className="content-right-text">{data.content}</p>
                    {data.votes_sum !== undefined && (
                        <span className="content-right-votes">
                            <Button variant="text">
                                <ThumbUpIcon/>
                            </Button>
                            <span>{data.votes_sum}</span>
                            <Button variant="text">
                                <ThumbDownIcon/>
                            </Button>
                        </span>
                    )}
                </main>
            </article>
        </section>
    )
}

ContentItem.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string,
        content: PropTypes.string.isRequired,
        created_at: PropTypes.string.isRequired,
        updated_at: PropTypes.string.isRequired,
        votes_sum: PropTypes.number.isRequired,
        author: PropTypes.shape({
            email: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
    type: PropTypes.oneOf(['post', 'topic']).isRequired,
};

export default ContentItem
