import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputLabel,
  LinearProgress,
} from "@material-ui/core";
import { Field, Form, Formik, FormikErrors, FormikValues } from "formik";
import { TextField, Switch } from "formik-material-ui";
import React, { Fragment, useContext } from "react";
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
} from "../../../constants/contracts";
import EtherContext from "../../../contexts/EtherContext";
import UserContext from "../../../contexts/UserContext";
import { Link } from "react-router-dom";
import { VERIFY_DOCS } from "../../../constants/routePaths";
import axios from "axios";

interface Props {
  open: boolean;
  onClose: () => void;
}

const RegisterModal: React.FunctionComponent<Props> = ({
  open,
  onClose,
}: Props) => {
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
    setJwtToken,
    setDomain,
  } = useContext(UserContext);

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Sign Up</DialogTitle>
      <Formik
        initialValues={{
          name: "",
          domain: "",
          password: "",
          isCompany: false,
        }}
        validate={(values) => {
          const errors: FormikErrors<FormikValues> = {};

          if (values.isCompany && values.name.length <= 0) {
            errors.name = "Required";
          }

          if (values.isCompany && values.domain.length <= 0) {
            errors.domain = "Required";
          }

          if (values.isCompany && values.password.length <= 0) {
            errors.password = "Required";
          }
          return errors;
        }}
        onSubmit={async (values) => {
          if (!!provider) {
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

            const address = await signer.getAddress();

            try {
              if (values.isCompany) {
                const createTx = await companyContract.createCompany(
                  values.name,
                  values.domain
                );

                await createTx.wait();

                const companyId = await companyContract.getCompanyIdByAddress(
                  address
                );

                const data = JSON.stringify({
                  companyId: companyId.toNumber(),
                  companyAddress: address,
                  password: values.password,
                });

                await axios({
                  method: "post",
                  url: "https://payrollah.herokuapp.com/company/signup",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  data: data,
                })
                  .then(function (response) {
                    const loginData = JSON.stringify({
                      companyAddress: address,
                      password: values.password,
                    });

                    return axios({
                      method: "post",
                      url: "https://payrollah.herokuapp.com/company/login",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      data: loginData,
                    });
                  })
                  .then(function (response) {
                    return setJwtToken(response.data.accessToken);
                  })
                  .catch(function (error) {
                    console.log(error);
                  });

                setCompanyId(companyId.toNumber());
                setIsCompany(true);
                setDomain(values.domain);
                setName(values.name);
              } else {
                const create = await workerContract.createWorker();
                await create.wait();
                const workerId = await workerContract.getWorkerIdByAddress(
                  address
                );

                console.log(workerId);

                setWorkerId(workerId.toNumber());
                setIsCompany(false);
                setName("");
              }
              setAddress(address);
              onClose();
            } catch (e) {
              console.error(e);
            }
          }
        }}
      >
        {({ submitForm, isSubmitting, values, isValid }) => (
          <Form>
            <DialogContent>
              <InputLabel htmlFor="isCompany">
                <Field name="isCompany" component={Switch} color="primary" />
                {values.isCompany
                  ? "Register as Company"
                  : "Register as Worker"}
              </InputLabel>
              {values.isCompany && (
                <Fragment>
                  <Field
                    component={TextField}
                    label="Domain"
                    name="domain"
                    fullWidth
                    required
                  />
                  <br />
                  <Field
                    component={TextField}
                    label="Name"
                    name="name"
                    fullWidth
                    required
                  />
                  <Field
                    component={TextField}
                    label="Password"
                    name="password"
                    fullWidth
                    required
                    type="password"
                  />
                </Fragment>
              )}
              <DialogContentText>
                By clicking submit, you agree to use the address in your
                MetaMask account to register with Payrollah
              </DialogContentText>
              {values.isCompany && (
                <DialogContentText>
                  <Link to={VERIFY_DOCS} onClick={onClose}>
                    How to setup DNS
                  </Link>
                </DialogContentText>
              )}
              {isSubmitting && <LinearProgress />}
            </DialogContent>
            <DialogActions>
              <Button disabled={isSubmitting} onClick={onClose}>
                Cancel
              </Button>
              <Button
                color="primary"
                disabled={isSubmitting || !isValid}
                onClick={submitForm}
              >
                Submit
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default RegisterModal;
