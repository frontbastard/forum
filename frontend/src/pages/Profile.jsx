import {Grid, Paper, Typography} from '@mui/material'
import SimpleListComponent from '../components/SimpleListComponent.jsx'
import {useUser} from '../providers/UserContext.jsx'

const UserProfile = () => {
  const [profile] = useUser(null)

  if (!profile) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>User Profile</h1>
      <Paper elevation={3} sx={{background: '#333',padding: 2, mb: 2}}>
        <p>Name: {profile.first_name}</p>
        <p>Name: {profile.last_name}</p>
        <p>Email: {profile.email}</p>
      </Paper>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} sx={{background: '#333',padding: 2}}>
            <Typography variant="h4">Topics</Typography>
            <SimpleListComponent
              items={profile.topics}
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
              items={profile.posts}
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
