import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  makeStyles,
  Toolbar,
} from "@material-ui/core";
import React, { useContext } from "react";
import "./Sidebar.css";
import WorkIcon from "@material-ui/icons/Work";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import { Link } from "react-router-dom";
import {
  JOBS,
  JOBLIST,
  TASKLIST,
  COMPANYPROFILE,
  WORKERPROFILE,
  VERIFY_DOCS,
  WATERMARK_DOCS,
} from "../../constants/routePaths";
import UserContext from "../../contexts/UserContext";
import ListIcon from "@material-ui/icons/List";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  link: {
    textDecoration: "none",
    color: "initial",
  },
}));

// List of menu for company
const companyMenuList = [
  {
    path: JOBS,
    label: "Jobs Posted",
    icon: <WorkIcon />,
  },
  {
    path: COMPANYPROFILE,
    label: "Profile",
    icon: <AccountBoxIcon />,
  },
];

// List of menu for worker
const workerMenuList = [
  {
    path: JOBLIST,
    label: "Available Jobs",
    icon: <WorkIcon />,
  },
  {
    path: TASKLIST,
    label: "Your Tasks",
    icon: <AssignmentIcon />,
  },
  {
    path: WORKERPROFILE,
    label: "Profile",
    icon: <AccountBoxIcon />,
  },
];

const companyDocsMenuList = [
  {
    path: VERIFY_DOCS,
    label: "DNS Setup",
    icon: <ListIcon />,
  },
  {
    path: WATERMARK_DOCS,
    label: "Evidence Watermark",
    icon: <ListIcon />,
  },
];

const workerDocsMenuList = [
  {
    path: WATERMARK_DOCS,
    label: "Evidence Watermark",
    icon: <ListIcon />,
  },
];

const Sidebar: React.FunctionComponent = () => {
  const classes = useStyles();
  const { isCompany } = useContext(UserContext);

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List>
          {(isCompany ? companyMenuList : workerMenuList).map((menu) => (
            <Link to={menu.path} key={menu.path} className={classes.link}>
              <ListItem button>
                <ListItemIcon>{menu.icon}</ListItemIcon>
                <ListItemText primary={menu.label} />
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <List
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Docs
            </ListSubheader>
          }
        >
          {(isCompany ? companyDocsMenuList : workerDocsMenuList).map(
            (menu) => (
              <Link to={menu.path} key={menu.path} className={classes.link}>
                <ListItem button>
                  <ListItemIcon>{menu.icon}</ListItemIcon>
                  <ListItemText primary={menu.label} />
                </ListItem>
              </Link>
            )
          )}
        </List>
      </div>
    </Drawer>
  );
};

export default Sidebar;
