import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Toolbar,
} from "@material-ui/core";
import React from "react";
import "./Sidebar.css";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import GroupIcon from "@material-ui/icons/Group";
import ReceiptIcon from "@material-ui/icons/Receipt";
import WorkIcon from "@material-ui/icons/Work";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { Link } from "react-router-dom";
import {
  JOBS,
  VIEWTASKS,
  VIEWCANDIDATES,
  JOBLIST,
  TASKLIST,
  EMPLOYEES,
  TRANSACTIONS,
} from "../../constants/routePaths";

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
}));

const Sidebar: React.FunctionComponent = () => {
  const classes = useStyles();
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
          <Link to={EMPLOYEES}>
            <ListItem button>
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary={"Employees"} />
            </ListItem>
          </Link>
          <Link to={TRANSACTIONS}>
            <ListItem button>
              <ListItemIcon>
                <ReceiptIcon />
              </ListItemIcon>
              <ListItemText primary={"Transactions"} />
            </ListItem>
          </Link>
          <Link to={JOBS}>
            <ListItem button>
              <ListItemIcon>
                <WorkIcon />
              </ListItemIcon>
              <ListItemText primary={"Jobs (Company)"} />
            </ListItem>
          </Link>
          <Link to={VIEWTASKS}>
            <ListItem button>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary={"Tasks (Company)"} />
            </ListItem>
          </Link>
          <Link to={VIEWCANDIDATES}>
            <ListItem button>
              <ListItemIcon>
                <WorkIcon />
              </ListItemIcon>
              <ListItemText primary={"Candidates (Company)"} />
            </ListItem>
          </Link>
          <Link to={JOBLIST}>
            <ListItem button>
              <ListItemIcon>
                <WorkIcon />
              </ListItemIcon>
              <ListItemText primary={"Jobs (Worker)"} />
            </ListItem>
          </Link>
          <Link to={TASKLIST}>
            <ListItem button>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary={"Tasks (Worker)"} />
            </ListItem>
          </Link>
        </List>
        <Divider />
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
        </List>
      </div>
    </Drawer>
  );
};

export default Sidebar;
