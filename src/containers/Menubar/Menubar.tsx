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
import RegisterModal from "./RegisterModal/RegisterModal";

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  title: {
    flexGrow: 1,
  },
  buttonContainer: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const Menubar: React.FunctionComponent = () => {
  const classes = useStyles();

  const { address } = useContext(UserContext);

  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <LoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onClickSignUp={() => {
          setLoginOpen(false);
          setRegisterOpen(true);
        }}
      />
      <RegisterModal
        open={registerOpen}
        onClose={() => setRegisterOpen(false)}
      />
      <Toolbar>
        <Typography variant="h6" noWrap className={classes.title}>
          Payrollah
        </Typography>
        <div>
          {!address.length ? (
            <div className={classes.buttonContainer}>
              <Button
                variant="contained"
                onClick={() => setLoginOpen(!loginOpen)}
              >
                Login
              </Button>
              <Button
                variant="contained"
                onClick={() => setRegisterOpen(!registerOpen)}
              >
                Sign Up
              </Button>
            </div>
          ) : (
            <div>{address}</div>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Menubar;
