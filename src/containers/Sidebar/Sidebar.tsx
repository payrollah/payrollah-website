import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
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
} from "../../constants/routePaths";
import UserContext from "../../contexts/UserContext";

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
        {/* <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <Link to={"/page2"} key={text}>
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            </Link>
          ))}
        </List> */}
      </div>
    </Drawer>
  );
};

export default Sidebar;
