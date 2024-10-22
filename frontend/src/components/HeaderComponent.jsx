import { grey } from '@mui/material/colors';
import {AppBar, Box, Toolbar, Typography} from '@mui/material';
import Button from '@mui/material/Button';

function HeaderComponent() {
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" sx={{backgroundColor: grey['800']}}>
                <Toolbar>
                    <Typography variant="h6" component="div"
                                sx={{flexGrow: 1}}>
                        <Button color="inherit" href="/">
                            Forum
                        </Button>
                    </Typography>
                    <Button color="inherit" href="/">
                        Login
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default HeaderComponent
