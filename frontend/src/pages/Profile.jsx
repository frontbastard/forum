import {Grid, Paper, Typography} from '@mui/material'
import SimpleListComponent from '../components/SimpleListComponent.jsx'
import {useUser} from '../providers/UserContext.jsx'
import {useEffect} from 'react'

const UserProfile = () => {
  const [user] = useUser(null)
  const [,,updateUser] = useUser()

  useEffect( () => {
    updateUser()
  }, [])

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>User Profile</h1>
      <Paper elevation={3} sx={{background: '#333',padding: 2, mb: 2}}>
        <p>Name: {user.first_name}</p>
        <p>Name: {user.last_name}</p>
        <p>Email: {user.email}</p>
      </Paper>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} sx={{background: '#333',padding: 2}}>
            <Typography variant="h4">Topics</Typography>
            <SimpleListComponent
              items={user.topics}
              uriPath='/topics'
              idField='id'
              textField='name'
            />
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper elevation={3} sx={{background: '#333',padding: 2}}>
            <Typography variant="h4">Posts</Typography>
            <SimpleListComponent
              items={user.posts}
              uriPath='/topics'
              idField='topic_id'
              textField='short_content'
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default UserProfile
