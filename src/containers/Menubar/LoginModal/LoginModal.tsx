import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputLabel,
  Link,
} from "@material-ui/core";
import {
  Company__factory,
  JobCreator__factory,
  Task__factory,
  Worker__factory,
} from "@payrollah/payrollah-registry";
import axios from "axios";
import { Field, Form, Formik, FormikErrors, FormikValues } from "formik";
import { Switch, TextField } from "formik-material-ui";
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
  onClickSignUp,
}: Props) => {
  const [error, setError] = useState("");

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
    setJwtToken,
  } = useContext(UserContext);

  return (
    <Formik
      initialValues={{
        password: "",
        isCompany: false,
      }}
      validate={(values) => {
        const errors: FormikErrors<FormikValues> = {};

        if (
          values.isCompany &&
          values.password &&
          values.password.length <= 0
        ) {
          errors.password = "Required";
        }
        return errors;
      }}
      onSubmit={async (values) => {
        if (!!provider) {
          setError("");

          await (window as any).ethereum.send("eth_requestAccounts");
          const signer = provider.getSigner();
          const address = await signer.getAddress();

          if (values.isCompany) {
            // Login to backend
            try {
              const data = JSON.stringify({
                companyAddress: address,
                password: values.password,
              });

              const response = await axios({
                method: "post",
                url: "https://payrollah.herokuapp.com/company/login",
                headers: {
                  "Content-Type": "application/json",
                },
                data: data,
              });
              setJwtToken(response.data.accessToken);
            } catch (e) {
              setError("Wrong Password");
              return;
            }
          }

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

          const taskContract = Task__factory.connect(
            TASK_CONTRACT_ADDR,
            signer
          );
          setTaskContract(taskContract);

          const jobCreatorContract = JobCreator__factory.connect(
            JOB_CREATOR_CONTRACT_ADDR,
            signer
          );
          setJobCreatorContract(jobCreatorContract);

          try {
            if (values.isCompany) {
              const companyId = await companyContract.getCompanyIdByAddress(
                address
              );

              const activeStatus = await companyContract.isActiveCompany(
                companyId
              );
              // console.log(activeStatus);
              if (activeStatus === true) {
                setCompanyId(companyId.toNumber());
                setIsCompany(true);

                const company = await companyContract.companies(companyId);

                setName(company.name);
                setDomain(company.domain);
                setAddress(address);
                onClose();
              } else {
                setError("User has been disabled!");
              }
            } else {
              const workerId = await workerContract.getWorkerIdByAddress(
                address
              );

              setWorkerId(workerId.toNumber());
              setIsCompany(false);
              setName("");
              setDomain("");
              setAddress(address);
              onClose();
            }
          } catch (e) {
            console.error(e);
            setError("User Not Found");
          }
        }
      }}
    >
      {({ values, submitForm, isSubmitting }) => (
        <Form>
          <Dialog open={open} onClose={onClose}>
            <DialogTitle>Login</DialogTitle>
            <DialogContent>
              <InputLabel htmlFor="isCompany">
                <Field name="isCompany" component={Switch} color="primary" />
                {values.isCompany ? "Login as Company" : "Login as Worker"}
              </InputLabel>
              {values.isCompany && (
                <Field
                  component={TextField}
                  label="Password"
                  name="password"
                  fullWidth
                  required
                  type="password"
                />
              )}
            </DialogContent>
            <DialogActions>
              <Button
                color="primary"
                onClick={submitForm}
                variant="contained"
                fullWidth
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <CircularProgress color="inherit" />
                ) : (
                  "Connect with Metamask"
                )}
              </Button>
            </DialogActions>
            <DialogContent>
              {error.length > 0 && (
                <DialogContentText color="error" align="center">
                  {error}
                </DialogContentText>
              )}
              <DialogContentText variant="body2">
                {"Don't have an account? "}
                <Link onClick={onClickSignUp}>Sign Up</Link>
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </Form>
      )}
    </Formik>
  );
};

export default LoginModal;
