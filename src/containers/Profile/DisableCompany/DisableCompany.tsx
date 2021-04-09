import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import React, { useContext } from "react";
import {
  COMPANY_CONTRACT_ADDR,
  JOB_CREATOR_CONTRACT_ADDR,
  TASK_CONTRACT_ADDR,
  WORKER_CONTRACT_ADDR,
} from "../../../constants/contracts";
import {
  Company__factory,
  JobCreator__factory,
  Task__factory,
  Worker__factory,
} from "@payrollah/payrollah-registry";
import EtherContext from "../../../contexts/EtherContext";
import UserContext from "../../../contexts/UserContext";

interface Props {
  open: boolean;
  onClose: () => void;
  companyId: number;
}

// Call Job contract function disableCompany()

const DisableCompany: React.FunctionComponent<Props> = ({
  open,
  onClose,
  companyId,
}: Props) => {
  const {
    provider,
    signer,
    companyContract,
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
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle id="form-dialog-title">Disable Company</DialogTitle>

      <Formik
        initialValues={{
          companyId: companyId,
        }}
        onSubmit={async (values) => {
          try {
            if (signer && companyContract) {
              await companyContract.disableCompany(companyId);
              handleLogout();
              onClose();
              window.location.href = "/";
            }
          } catch (e) {
            console.error(e);
          }
        }}
      >
        {({ submitForm, isSubmitting }) => (
          <Form>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to disable your company account?
              </DialogContentText>
              {isSubmitting && <LinearProgress />}
            </DialogContent>
            <DialogActions>
              <Button
                color="secondary"
                disabled={isSubmitting}
                onClick={submitForm}
              >
                Yes
              </Button>
              <Button disabled={isSubmitting} onClick={onClose} color="primary">
                No
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default DisableCompany;
