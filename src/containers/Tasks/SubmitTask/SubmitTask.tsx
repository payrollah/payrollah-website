import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  LinearProgress,
} from "@material-ui/core";
import { Job__factory } from "@payrollah/payrollah-registry";
import { Field, Form, Formik, FormikErrors, FormikValues } from "formik";
import { TextField } from "formik-material-ui";
import React, { useContext } from "react";
import EtherContext from "../../../contexts/EtherContext";

interface Props {
  open: boolean;
  onClose: () => void;
  taskId: number;
  jobAddr: string;
}

const SubmitTask: React.FunctionComponent<Props> = ({
  open,
  onClose,
  taskId,
  jobAddr,
}: Props) => {
  const { signer } = useContext(EtherContext);

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Submit for Task ID: {taskId}</DialogTitle>
      <Formik
        initialValues={{
          evidence: "",
          taskId: taskId,
        }}
        validate={(values) => {
          const errors: FormikErrors<FormikValues> = {};

          if (!values.evidence) {
            errors.evidence = "Required";
          }

          return errors;
        }}
        onSubmit={async (values) => {
          if (signer) {
            try {
              const jobContract = Job__factory.connect(jobAddr, signer);
              await jobContract.submitTask(taskId, values.evidence);
              onClose();
            } catch (e) {
              console.error(e);
            }
          }
        }}
      >
        {({ submitForm, isSubmitting }) => (
          <Form>
            <DialogContent>
              <Field
                component={TextField}
                label="Hyperlink to Work"
                name="evidence"
                fullWidth
              />
              {isSubmitting && <LinearProgress />}
            </DialogContent>
            <DialogActions>
              <Button disabled={isSubmitting} onClick={onClose}>
                Cancel
              </Button>
              <Button
                color="primary"
                disabled={isSubmitting}
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

export default SubmitTask;
