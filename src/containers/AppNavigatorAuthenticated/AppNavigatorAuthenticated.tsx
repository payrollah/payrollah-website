import { makeStyles, Toolbar } from "@material-ui/core";
import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";
import {
  JOBS,
  VIEWTASKS,
  VIEWCANDIDATES,
  JOBLIST,
  TASKLIST,
  VERIFY_DOCS,
  ROOT,
} from "../../constants/routePaths";
import Jobs from "../Jobs/Jobs";
import ViewTasks from "../Tasks/ViewTasks";
import ViewCandidates from "../Tasks/ViewCandidates/ViewCandidates";
import JobList from "../Jobs/JobList";
import VerifyDocumentation from "../Verify/VerifyDocumentation";
import TaskList from "../Tasks/TaskList";
import Menubar from "../Menubar/Menubar";
import Sidebar from "../Sidebar/Sidebar";
import UserContext from "../../contexts/UserContext";
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
const EmployeeRoutes: React.FunctionComponent = () => {
  return (
    <div>
      <Switch>
        <Route path={JOBLIST} component={JobList} />
        <Route path={TASKLIST} component={TaskList} />
        <Route path={VERIFY_DOCS} component={VerifyDocumentation} />
        <Route path={ROOT} component={Home} />
      </Switch>
    </div>
  );
};

// Pages companies can see
const CompanyRoutes: React.FunctionComponent = () => {
  return (
    <div>
      <Switch>
        <Route path={JOBS} component={Jobs} />
        <Route path={VIEWTASKS} component={ViewTasks} />
        <Route path={VIEWCANDIDATES} component={ViewCandidates} />
        <Route path={VERIFY_DOCS} component={VerifyDocumentation} />
        <Route path={ROOT} component={Home} />
      </Switch>
    </div>
  );
};

const AppNavigatorAuthenticated: React.FunctionComponent = () => {
  const classes = useStyles();
  const { isCompany } = useContext(UserContext);

  return (
    <div className={classes.root}>
      <Menubar />
      <Sidebar />
      <main className={classes.content}>
        <Toolbar />
        {isCompany ? <CompanyRoutes /> : <EmployeeRoutes />}
      </main>
    </div>
  );
};

export default AppNavigatorAuthenticated;
