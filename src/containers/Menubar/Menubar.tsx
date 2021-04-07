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
import {
  Company__factory,
  JobCreator__factory,
  Task__factory,
  Worker__factory,
} from "@payrollah/payrollah-registry";
import {
  COMPANY_CONTRACT_ADDR,
  JOB_CREATOR_CONTRACT_ADDR,
  TASK_CONTRACT_ADDR,
  WORKER_CONTRACT_ADDR,
} from "../../constants/contracts";
import MoodIcon from "@material-ui/icons/Mood";

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

  const {
    provider,
    signer,
    setSigner,
    setCompanyContract,
    setWorkerContract,
    setJobCreatorContract,
    setTaskContract,
  } = useContext(EtherContext);
  const [address, setAddress] = useState("");

  const onClickConnect = () => {
    if (!!provider) {
      const signer = provider.getSigner();
      setSigner(signer);

      // replace readonly contracts with write-allowed contracts
      const companyContract = Company__factory.connect(
        COMPANY_CONTRACT_ADDR,
        signer
      );
      setCompanyContract(companyContract);

      const workerContract = Worker__factory.connect(
        WORKER_CONTRACT_ADDR,
        signer
      );
      setWorkerContract(workerContract);

      const taskContract = Task__factory.connect(TASK_CONTRACT_ADDR, signer);
      setTaskContract(taskContract);

      const jobCreatorContract = JobCreator__factory.connect(
        JOB_CREATOR_CONTRACT_ADDR,
        signer
      );
      setJobCreatorContract(jobCreatorContract);
    }
  };

  signer?.getAddress().then(setAddress);

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <MoodIcon style={{ paddingRight: "8px", height: 30, width: 30 }} />
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
