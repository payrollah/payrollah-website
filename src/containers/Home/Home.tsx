import { Box, makeStyles, Typography } from "@material-ui/core";
import React from "react";
// import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "80vh",
  },
}));

// <Paper variant="outlined">
//   <img src="/../../payrollah_logo.png" />
// </Paper>

const Home: React.FunctionComponent = () => {
  const classes = useStyles();
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      className={classes.root}
    >
      <Typography variant="h1">Payrollah</Typography>
    </Box>
  );
};

export default Home;
