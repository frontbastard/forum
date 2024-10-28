import Button from '@mui/material/Button'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import {useState} from 'react'
import api from '../interceptors/api.js'
import PropTypes from 'prop-types'

function LikesComponent({id, likesCount, isUserLiked}) {
  const [likes, setLikes] = useState(likesCount)
  const [isLiked, setIsLiked] = useState(isUserLiked)

  const likeOnPost = async () => {
    await api.post(`/forum/posts/${id}/like/`)
      .then(response => {
        setLikes(response.data.likes)
        setIsLiked(!isLiked)
      })
  }

  return (
    <span className="content-right-votes">
      <Button
        startIcon={<ThumbUpIcon/>}
        sx={{
          color: isLiked ? '#90caf9' : '#eee'
        }}
        onClick={likeOnPost}
      >
        <span>{likes}</span>
      </Button>
    </span>
  )
}

LikesComponent.propTypes = {
  id: PropTypes.number.isRequired,
  likesCount: PropTypes.number,
  isUserLiked: PropTypes.bool,
}

export default LikesComponent
