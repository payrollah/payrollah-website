import { makeStyles, Toolbar } from "@material-ui/core";
import React from "react";
import { Route, Switch } from "react-router-dom";
import { VERIFY_DOCS, ROOT } from "../../constants/routePaths";
import VerifyDocumentation from "../Verify/VerifyDocumentation";
import Menubar from "../Menubar/Menubar";
import Home from "../Home/Home";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

// Pages employees can see
const Routes: React.FunctionComponent = () => {
  return (
    <div>
      <Switch>
        <Route path={VERIFY_DOCS} component={VerifyDocumentation} />
        <Route path={ROOT} component={Home} />
      </Switch>
    </div>
  );
};

const AppNavigatorAnonymous: React.FunctionComponent = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Menubar />
      <main className={classes.content}>
        <Toolbar />
        <Routes />
      </main>
    </div>
  );
};

export default AppNavigatorAnonymous;
