import Button from '@mui/material/Button';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import {useEffect, useState} from 'react';
import api from '../interceptors/api.js';

function VotesComponent({id, votes_sum}) {
  const [votes, setVotes] = useState(votes_sum || 0)
  const [userVote, setUserVote] = useState(votes_sum || 0)

  const voteOnPost = async (value) => {
    await api.post(`/forum/posts/${id}/vote/`, {vote_value: value})
      .then(response => {
        setVotes(response.data.value)
        setUserVote(value)
      })
  }

  return (
    <span className="content-right-votes">
      <Button
        variant="text"
        onClick={() => voteOnPost(1)}
        disabled={userVote === 1 && votes !== 0}
      >
        <ThumbUpIcon/>
      </Button>
      <span>{votes}</span>
      <Button
        variant="text"
        onClick={() => voteOnPost(-1)}
        disabled={userVote === -1 && votes !== 0}
      >
        <ThumbDownIcon/>
      </Button>
    </span>
  )
}

export default VotesComponent
