import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppNavigatorAuthenticated from "../AppNavigatorAuthenticated/AppNavigatorAuthenticated";
import "./App.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import EtherContext from "../../contexts/EtherContext";
import { ethers } from "ethers";
// import CompanyAbi from "../../contracts/Company";
import { COMPANY_CONTRACT_ADDR } from "../../constants/contracts";
import { Company__factory } from "@payrollah/payrollah-registry/dist/ts";

const theme = createMuiTheme({
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
  const [companyContract, setCompanyContract] = useState<ethers.Contract>();
  const [jobContract, setJobContract] = useState<ethers.Contract>();
  const [
    jobCreatorContract,
    setJobCreatorContract,
  ] = useState<ethers.Contract>();
  const [taskContract, setTaskContract] = useState<ethers.Contract>();
  const [workerContract, setWorkerContract] = useState<ethers.Contract>();

  useEffect(() => {
    const { ethereum } = window as any;
    ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(ethereum);
    setEtherProvider(provider);

    const companyContract = Company__factory.connect(
      COMPANY_CONTRACT_ADDR,
      provider
    );
    setCompanyContract(companyContract);
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
          jobContract,
          setJobContract,
          jobCreatorContract,
          setJobCreatorContract,
          taskContract,
          setTaskContract,
          workerContract,
          setWorkerContract,
        }}
      >
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <AppNavigatorAuthenticated />
            </MuiPickersUtilsProvider>
          </BrowserRouter>
        </ThemeProvider>
      </EtherContext.Provider>
    </div>
  );
};

export default App;
