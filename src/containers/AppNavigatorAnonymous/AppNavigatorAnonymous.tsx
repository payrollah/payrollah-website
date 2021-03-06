import { makeStyles, Toolbar } from "@material-ui/core";
import React from "react";
import { Redirect, Route, RouteComponentProps, Switch } from "react-router-dom";
import { WATERMARK_DOCS, VERIFY_DOCS, ROOT } from "../../constants/routePaths";
import VerifyDocumentation from "../Verify/VerifyDocumentation";
import WatermarkDocumentation from "../Watermark/WatermarkDocumentation";
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
        <Route path={WATERMARK_DOCS} component={WatermarkDocumentation} />
        <Route
          path={ROOT}
          render={(props: RouteComponentProps) =>
            !props.match.isExact ? <Redirect to={ROOT} /> : <Home />
          }
        />
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
