import {
  Company,
  JobCreator,
  Task,
  Worker,
} from "@payrollah/payrollah-registry/dist/ts/contracts";
import { ethers } from "ethers";
import React from "react";

interface EtherProvider {
  provider: ethers.providers.Web3Provider | undefined;
  signer: ethers.providers.JsonRpcSigner | undefined;
  setProvider: (value: any) => void;
  setSigner: (value: any) => void;
  companyContract?: Company;
  setCompanyContract: (value: any) => void;
  jobContract?: ethers.Contract;
  setJobContract: (value: any) => void;
  jobCreatorContract?: JobCreator;
  setJobCreatorContract: (value: any) => void;
  taskContract?: Task;
  setTaskContract: (value: any) => void;
  workerContract?: Worker;
  setWorkerContract: (value: any) => void;
}

const EtherContext = React.createContext<EtherProvider>({
  provider: undefined,
  signer: undefined,
  setProvider: (value: any) => {
    return;
  },
  setSigner: (value: any) => {
    return;
  },
  setCompanyContract: (value: any) => {
    return;
  },
  setJobContract: (value: any) => {
    return;
  },
  setJobCreatorContract: (value: any) => {
    return;
  },
  setTaskContract: (value: any) => {
    return;
  },
  setWorkerContract: (value: any) => {
    return;
  },
});

export default EtherContext;
