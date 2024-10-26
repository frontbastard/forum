import {useState} from "react";
import api from "../interceptors/api.js";
import {Box, Container, Paper, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";

function CategoryCreate() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const submit = async (e) => {
    e.preventDefault()

    const category = {
      name,
      description,
    }

    try {
      await api.post('/forum/categories/', category)
      window.location.href = '/'
    } catch (error) {
      console.error('Category add error:', error)
    }
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          <b>Add Category</b>
        </Typography>
        <Typography variant="body2" align="center" gutterBottom>
          Please enter the name and description of the category..
        </Typography>
        <form onSubmit={submit}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            multiline
            rows={4}
            label="Description"
            variant="outlined"
            fullWidth
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <Box mt={2} display="flex" justifyContent="center">
            <Button type="submit" variant="contained" color="primary" size="large">
              Create
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  )
}

export default CategoryCreate