import { makeStyles, Toolbar } from "@material-ui/core";
import React from "react";
import { Route, Switch } from "react-router-dom";
import {
  EMPLOYEES,
  CLAIMS,
  COMPANYCLAIMS,
  JOBS,
} from "../../constants/routePaths";
import Employees from "../Employees/Employees";
import Claims from "../Claims/Claims";
import Jobs from "../Jobs/Jobs";
// import ViewJob from "../Tasks/ViewJob";
// import ViewCandidates from "../Tasks/ViewCandidates/ViewCandidates";
import CompanyClaims from "../Claims/CompanyClaims";
import Menubar from "../Menubar/Menubar";
import Sidebar from "../Sidebar/Sidebar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const Routes: React.FunctionComponent = () => {
  return (
    <div>
      <Switch>
        <Route path={EMPLOYEES} component={Employees} />
        <Route path={CLAIMS} component={Claims} />
        <Route path={JOBS} component={Jobs} />
        <Route path={COMPANYCLAIMS} component={CompanyClaims} />
        <Route path={"/page2"}>
          <div>Page 2</div>
        </Route>
      </Switch>
    </div>
  );
};

const AppNavigatorAuthenticated: React.FunctionComponent = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Menubar />
      <Sidebar />
      <main className={classes.content}>
        <Toolbar />
        <Routes />
      </main>
    </div>
  );
};

export default AppNavigatorAuthenticated;
