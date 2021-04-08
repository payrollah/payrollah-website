import { Box, makeStyles, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "80vh",
  },
}));

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
