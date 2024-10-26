import Button from '@mui/material/Button';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import {useEffect, useState} from 'react';
import api from '../interceptors/api.js';

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
        variant="link"
        sx={{
          color: isLiked ? '#90caf9' : '#eee'
        }}
        onClick={likeOnPost}
      >
        <ThumbUpIcon/>
      </Button>
      <span>{likes}</span>
    </span>
  )
}

export default LikesComponent
