import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Link,
  Switch,
} from "@material-ui/core";
import {
  Company__factory,
  JobCreator__factory,
  Task__factory,
  Worker__factory,
} from "@payrollah/payrollah-registry";
import React, { useContext, useState } from "react";
import {
  COMPANY_CONTRACT_ADDR,
  JOB_CREATOR_CONTRACT_ADDR,
  TASK_CONTRACT_ADDR,
  WORKER_CONTRACT_ADDR,
} from "../../../constants/contracts";
import EtherContext from "../../../contexts/EtherContext";
import UserContext from "../../../contexts/UserContext";

interface Props {
  open: boolean;
  onClose: () => void;
  onClickSignUp: () => void;
}

const LoginModal: React.FunctionComponent<Props> = ({
  open,
  onClose,
}: Props) => {
  const [isCompanyValue, setIsCompanyValue] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const {
    provider,
    setSigner,
    setCompanyContract,
    setWorkerContract,
    setJobCreatorContract,
    setTaskContract,
  } = useContext(EtherContext);

  const {
    setName,
    setIsCompany,
    setCompanyId,
    setWorkerId,
    setAddress,
    setDomain,
  } = useContext(UserContext);

  const onConnect = async () => {
    if (!!provider) {
      setLoading(true);
      setError(false);

      await (window as any).ethereum.send("eth_requestAccounts");
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

      const address = await signer.getAddress();

      try {
        if (isCompanyValue) {
          const companyId = await companyContract.getCompanyIdByAddress(
            address
          );

          setCompanyId(companyId.toNumber());
          setIsCompany(true);

          const company = await companyContract.companies(companyId);
          setName(company.name);
          setDomain(company.domain);
        } else {
          const workerId = await workerContract.getWorkerIdByAddress(address);

          setWorkerId(workerId.toNumber());
          setIsCompany(false);
          setName("");
          setDomain("");
        }
        setAddress(address);
        onClose();
      } catch (e) {
        console.error(e);
        setError(true);
      }

      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <FormControlLabel
          control={
            <Switch
              checked={isCompanyValue}
              onChange={(event) => setIsCompanyValue(event.target.checked)}
              name="isCompany"
              color="primary"
            />
          }
          label={isCompanyValue ? "Login as Company" : "Login as Worker"}
        />
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          onClick={onConnect}
          variant="contained"
          fullWidth
          disabled={loading}
        >
          {loading ? (
            <CircularProgress color="inherit" />
          ) : (
            "Connect with Metamask"
          )}
        </Button>
      </DialogActions>
      <DialogContent>
        {error && (
          <DialogContentText color="error" align="center">
            User not found!
          </DialogContentText>
        )}
        <DialogContentText variant="body2">
          {"Don't have an account? "}
          <Link>Sign Up</Link>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
