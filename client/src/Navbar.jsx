// import * as React from 'react';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 2 }}>
            VIGGY
          </Typography>
          <Button color="inherit" href="/stalls">
            STALLS
          </Button>
          {/* <Button color="inherit" href="/cart">
            Cart
          </Button> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
//
