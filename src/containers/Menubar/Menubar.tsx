import {
  AppBar,
  Button,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import MetaMaskOnboarding from "@metamask/onboarding";
import EtherContext from "../../contexts/EtherContext";

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  title: {
    flexGrow: 1,
  },
}));

const isMetaMaskInstalled = () => {
  //Have to check the ethereum binding on the window object to see if it's installed
  const { ethereum } = window as any;
  return Boolean(ethereum && ethereum.isMetaMask);
};

const onClickInstall = () => {
  const onboarding = new MetaMaskOnboarding();
  onboarding.startOnboarding();
};

const Menubar: React.FunctionComponent = () => {
  const classes = useStyles();

  const { provider, signer, setSigner } = useContext(EtherContext);
  const [address, setAddress] = useState("");

  const onClickConnect = () => {
    if (!!provider) {
      const signer = provider.getSigner();
      setSigner(signer);
      console.log(signer);
      console.log("logged");
    }
  };

  signer?.getAddress().then(setAddress);

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" noWrap className={classes.title}>
          Payrollah
        </Typography>
        <div>
          {!signer ? (
            <Button
              variant="contained"
              onClick={!isMetaMaskInstalled() ? onClickInstall : onClickConnect}
            >
              {!isMetaMaskInstalled()
                ? "Install Metamask"
                : "Connect to Metamask"}
            </Button>
          ) : (
            <div>{address}</div>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Menubar;
