import PropTypes from 'prop-types'
import Avatar from '@mui/material/Avatar'
import LikesComponent from './LikesComponent.jsx'
import {Box, Typography} from '@mui/material'
import {useUser} from '../providers/UserContext.jsx'
import {Delete, Edit, Save} from '@mui/icons-material'
import Button from '@mui/material/Button'
import {useEffect, useRef, useState} from 'react'

function ItemDetailsComponent({item, type, onDelete, onEdit}) {
  const [user] = useUser()
  const textareaRef = useRef(null)
  const [isEdit, setIsEdit] = useState(false)
  const [editedContent, setEditedContent] = useState(item.content)

  useEffect(() => {
    if (isEdit && textareaRef.current) {
      textareaRef.current.focus()
      const length = textareaRef.current.value.length
      textareaRef.current.setSelectionRange(length, length)
    }
  }, [isEdit])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      handleSave(e)
    }
  }

  const handleSave = (e) => {
    e.preventDefault()
    setIsEdit(false)
    onEdit(e, item.id, editedContent)
  }

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
        <p>{item.author.topics_count} topic{item.author.topics_count > 1 && 's'} /&nbsp;
          {item.author.posts_count} posts</p>
        <p><strong>{item.author.is_staff && 'Moderator'}</strong></p>
      </aside>
      <article className="content-right">
        <header className="content-right-header">
          {
            item.created_at === item.updated_at ?
              item.created_at :
              item.updated_at
          }

          {(user?.id === item.author.id || user.is_staff) && (
            <Box>
              {isEdit ? (
                <Button
                  size="small"
                  startIcon={
                    <Save fontSize='small'/>
                  }
                  sx={{
                    mr: 2
                  }}
                  onClick={handleSave}
                >
                  Save
                </Button>
              ) : (
                <Button
                  size="small"
                  startIcon={
                    <Edit fontSize='small'/>
                  }
                  sx={{
                    mr: 2
                  }}
                  onClick={() => setIsEdit(true)}
                >
                  Edit
                </Button>
              )}
              <Button
                size="small"
                startIcon={
                  <Delete
                    fontSize='small'
                    sx={{cursor: 'pointer'}}
                    onClick={(e) => onDelete(e, item.id)}
                  />
                }
              >
                Delete
              </Button>
            </Box>
          )}
        </header>
        <main className="content-right-main">
          {isEdit ? (
            <Box
              component="textarea"
              wrap="hard"
              ref={textareaRef}
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              onKeyDown={handleKeyDown}
              sx={{
                bgcolor: 'transparent',
                height: '100%',
                color: '#fff',
                fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                fontSize: '1rem',
                lineHeight: '24px',
                outline: 'none',
              }}
            >
              {item.content}
            </Box>
          ) : (
            <Typography
              component="p"
              className="content-right-text"
              sx={{
                whiteSpace: 'pre-wrap'
              }}
            >
              {item.content}
            </Typography>
          )}

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
      id: PropTypes.number.isRequired,
      is_staff: PropTypes.bool,
      email: PropTypes.string.isRequired,
      date_joined: PropTypes.string.isRequired,
      posts_count: PropTypes.number.isRequired,
      topics_count: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  type: PropTypes.oneOf(['post', 'topic']).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
}

export default ItemDetailsComponent
