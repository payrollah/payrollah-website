import { makeStyles, Toolbar } from "@material-ui/core";
import React from "react";
import { Route, Switch } from "react-router-dom";
import {
  EMPLOYEES,
  JOBS,
  VIEWTASKS,
  VIEWCANDIDATES,
  JOBLIST,
  TASKLIST,
} from "../../constants/routePaths";
import Employees from "../Employees/Employees";
import Jobs from "../Jobs/Jobs";
import ViewTasks from "../Tasks/ViewTasks";
import ViewCandidates from "../Tasks/ViewCandidates/ViewCandidates";
import JobList from "../Jobs/JobList";
import TaskList from "../Tasks/TaskList";
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
        <Route path={JOBS} component={Jobs} />
        <Route path={VIEWTASKS} component={ViewTasks} />
        <Route path={VIEWCANDIDATES} component={ViewCandidates} />
        <Route path={JOBLIST} component={JobList} />
        <Route path={TASKLIST} component={TaskList} />
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
