import {Box, Toolbar, Typography, AppBar as MuiAppBar} from '@mui/material';

const AppBar = () => {
  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
          <MuiAppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Factorial Weather
              </Typography>
            </Toolbar>
          </MuiAppBar>
      </Box>
    </div>
  );
}

export default AppBar;
