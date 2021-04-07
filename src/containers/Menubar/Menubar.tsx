import {
  AppBar,
  Button,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import LoginModal from "./LoginModal/LoginModal";
import UserContext from "../../contexts/UserContext";

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  title: {
    flexGrow: 1,
  },
}));

const Menubar: React.FunctionComponent = () => {
  const classes = useStyles();

  const { address } = useContext(UserContext);

  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <LoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onClickSignUp={console.log}
      />
      <Toolbar>
        <Typography variant="h6" noWrap className={classes.title}>
          Payrollah
        </Typography>
        <div>
          {!address.length ? (
            <Button
              variant="contained"
              onClick={() => setLoginOpen(!loginOpen)}
            >
              Login
            </Button>
          ) : (
            <div>{address}</div>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Menubar;
