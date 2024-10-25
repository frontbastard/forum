import Button from '@mui/material/Button';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import {useEffect, useState} from 'react';
import api from '../interceptors/api.js';

function LikesComponent({id, likesCount}) {
  const [likes, setLikes] = useState(likesCount)
  const likeOnPost = async () => {
    await api.post(`/forum/posts/${id}/like/`)
      .then(response => {
        setLikes(response.data.likes)
      })
  }

  return (
    <span className="content-right-votes">
      <Button
        variant="text"
        onClick={() => likeOnPost()}
      >
        <ThumbUpIcon/>
      </Button>
      <span>{likes}</span>
    </span>
  )
}

export default LikesComponent
