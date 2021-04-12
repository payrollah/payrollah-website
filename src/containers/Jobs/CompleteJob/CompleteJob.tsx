import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
} from "@material-ui/core";
import { Job__factory } from "@payrollah/payrollah-registry";
import { Form, Formik } from "formik";
import React, { useContext } from "react";
import EtherContext from "../../../contexts/EtherContext";

interface Props {
  open: boolean;
  onClose: () => void;
  jobAddr: string;
  onUpdate: () => void;
}

// Call Job contract function completeJob()

const CompleteJob: React.FunctionComponent<Props> = ({
  open,
  onClose,
  jobAddr,
  onUpdate,
}: Props) => {
  const { signer } = useContext(EtherContext);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle id="form-dialog-title">Job Completed</DialogTitle>

      <Formik
        initialValues={{
          jobAddr: jobAddr,
        }}
        onSubmit={async (values) => {
          try {
            if (signer) {
              const jobContract = Job__factory.connect(jobAddr, signer);
              const complete = await jobContract.completeJob();
              await complete.wait();
              onUpdate();
              onClose();
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
