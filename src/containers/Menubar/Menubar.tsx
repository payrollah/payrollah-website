import {
  AppBar,
  Button,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import LoginModal from "./LoginModal/LoginModal";
import UserContext from "../../contexts/UserContext";
import RegisterModal from "./RegisterModal/RegisterModal";
import { AccountCircle } from "@material-ui/icons";
import {
  COMPANY_CONTRACT_ADDR,
  JOB_CREATOR_CONTRACT_ADDR,
  TASK_CONTRACT_ADDR,
  WORKER_CONTRACT_ADDR,
} from "../../constants/contracts";
import {
  Company__factory,
  JobCreator__factory,
  Task__factory,
  Worker__factory,
} from "@payrollah/payrollah-registry";
import EtherContext from "../../contexts/EtherContext";
import logo from "../../payrollah_logo_without_name.png"; // with import
import {
  COMPANYPROFILE,
  ROOT,
  WORKERPROFILE,
} from "../../constants/routePaths";
import { Link } from "react-router-dom";

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
  menuItem: {
    color: "inherit",
    textDecoration: "none",
  },
}));

const Menubar: React.FunctionComponent = () => {
  const classes = useStyles();

  const { address } = useContext(UserContext);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const {
    provider,
    setSigner,
    setCompanyContract,
    setWorkerContract,
    setJobCreatorContract,
    setTaskContract,
  } = useContext(EtherContext);

  const {
    isCompany,
    setName,
    setIsCompany,
    setCompanyId,
    setWorkerId,
    setAddress,
    setDomain,
    setJwtToken,
  } = useContext(UserContext);

  const handleLogout = async () => {
    if (!!provider) {
      setSigner(undefined);
      const companyContract = Company__factory.connect(
        COMPANY_CONTRACT_ADDR,
        provider
      );
      setCompanyContract(companyContract);

      const workerContract = Worker__factory.connect(
        WORKER_CONTRACT_ADDR,
        provider
      );
      setWorkerContract(workerContract);

      const taskContract = Task__factory.connect(TASK_CONTRACT_ADDR, provider);
      setTaskContract(taskContract);

      const jobCreatorContract = JobCreator__factory.connect(
        JOB_CREATOR_CONTRACT_ADDR,
        provider
      );
      setJobCreatorContract(jobCreatorContract);

      setName("");
      setIsCompany(false);
      setCompanyId(0);
      setWorkerId(0);
      setAddress("");
      setDomain("");
      setJwtToken("");
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
    setAnchorEl(null);
  };

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
        <img
          style={{
            height: 40,
            width: 40,
            marginRight: "8px",
            borderRadius: "50%",
          }}
          src={logo}
          alt="Payrollah"
        />
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
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenuOpen}
                color="inherit"
              >
                <Typography>{address.substring(0, 8)}...</Typography>
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                getContentAnchorEl={null}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                open={menuOpen}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose}>
                  <Link
                    to={isCompany ? COMPANYPROFILE : WORKERPROFILE}
                    className={classes.menuItem}
                  >
                    Profile
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Link to={ROOT} className={classes.menuItem}>
                    Logout
                  </Link>
                </MenuItem>
              </Menu>
            </div>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Menubar;
