import {Typography} from '@mui/material'
import {grey} from '@mui/material/colors'

function FooterComponent() {
  return (
    <Typography align="center"
                sx={{backgroundColor: grey['800'], py: 5, mt: 5}}>
      Copyright &copy; all rights reserved.
    </Typography>
  )
}

export default FooterComponent
