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
import React from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  jobAddr: string;
}

// Call Job contract function completeJob()

const CompleteJob: React.FunctionComponent<Props> = ({
  open,
  onClose,
  jobAddr,
}: Props) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle id="form-dialog-title">Job Completed</DialogTitle>

      <Formik
        initialValues={{
          jobAddr: jobAddr,
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
            alert(JSON.stringify(values, null, 2));
            // Call JobCreator contract function deployNewJob(string calldata _title, string calldata _description)
            onClose();
          }, 500);
        }}
      >
        {({ submitForm, isSubmitting }) => (
          <Form>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to close the job?
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

export default CompleteJob;
