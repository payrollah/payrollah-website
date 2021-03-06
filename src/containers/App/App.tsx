import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppNavigatorAuthenticated from "../AppNavigatorAuthenticated/AppNavigatorAuthenticated";
import "./App.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import EtherContext from "../../contexts/EtherContext";
import { ethers } from "ethers";
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
import {
  Company,
  JobCreator,
  Task,
  Worker,
} from "@payrollah/payrollah-registry/dist/ts/contracts";
import MetaMaskOnboarding from "@metamask/onboarding";
import UserContext from "../../contexts/UserContext";
import AppNavigatorAnonymous from "../AppNavigatorAnonymous/AppNavigatorAnonymous";

const theme = createMuiTheme({
  typography: {
    fontFamily: "'Poppins', sans-serif;",
  },
  palette: {
    primary: {
      main: "rgb(49,201,104)",
      contrastText: "rgb(38,50,56)",
    },
  },
  overrides: {
    MuiTextField: {
      root: {
        marginTop: "0.75rem",
        marginBottom: "0.75rem",
      },
    },
    MuiFormControl: {
      root: {
        marginTop: "0.75rem",
        marginBottom: "0.75rem",
      },
    },
  },
});

const App: React.FunctionComponent = () => {
  const [
    etherProvider,
    setEtherProvider,
  ] = useState<ethers.providers.Web3Provider>();
  const [
    etherSigner,
    setEtherSigner,
  ] = useState<ethers.providers.JsonRpcSigner>();
  const [companyContract, setCompanyContract] = useState<Company>();
  const [jobCreatorContract, setJobCreatorContract] = useState<JobCreator>();
  const [taskContract, setTaskContract] = useState<Task>();
  const [workerContract, setWorkerContract] = useState<Worker>();

  const [name, setName] = useState("");
  const [isCompany, setIsCompany] = useState(false);
  const [companyId, setCompanyId] = useState<number>();
  const [workerId, setWorkerId] = useState<number>();
  const [address, setAddress] = useState("");
  const [domain, setDomain] = useState("");
  const [jwtToken, setJwtToken] = useState("");

  useEffect(() => {
    const { ethereum } = window as any;
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      setEtherProvider(provider);

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

      // const transferLogFilter = jobCreatorContract.filters.JobDeployed(
      //   null,
      //   "0x9E05Aa244F582caE032DE2271C81067846818a55"
      // );
      // jobCreatorContract.queryFilter(transferLogFilter, 0).then(console.log);
    }
  }, []);

  return (
    <div className="App">
      <EtherContext.Provider
        value={{
          provider: etherProvider,
          setProvider: setEtherProvider,
          signer: etherSigner,
          setSigner: setEtherSigner,
          companyContract,
          setCompanyContract,
          jobCreatorContract,
          setJobCreatorContract,
          taskContract,
          setTaskContract,
          workerContract,
          setWorkerContract,
        }}
      >
        <UserContext.Provider
          value={{
            name,
            isCompany,
            companyId,
            workerId,
            address,
            domain,
            jwtToken,
            setName,
            setIsCompany,
            setCompanyId,
            setWorkerId,
            setAddress,
            setDomain,
            setJwtToken,
          }}
        >
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                {!!etherSigner && (!isCompany || jwtToken.length > 0) ? (
                  <AppNavigatorAuthenticated />
                ) : (
                  <AppNavigatorAnonymous />
                )}
              </MuiPickersUtilsProvider>
            </BrowserRouter>
          </ThemeProvider>
        </UserContext.Provider>
      </EtherContext.Provider>
    </div>
  );
};

export default App;
