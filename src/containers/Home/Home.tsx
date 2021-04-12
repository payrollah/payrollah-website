import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import logo from "../../payrollah_logo.png"; // with import

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
      <img
        style={{
          height: 500,
          width: 500,
        }}
        src={logo}
        alt="Payrollah"
      />
    </Box>
  );
};

export default Home;
