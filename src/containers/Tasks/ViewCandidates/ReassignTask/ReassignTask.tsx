import { BigNumber } from "@ethersproject/bignumber";
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
import EtherContext from "../../../../contexts/EtherContext";

interface Props {
  open: boolean;
  onClose: () => void;
  taskId: number;
  workerAddr: string;
  jobAddr: string;
  onUpdate: () => void;
}
// Call Job contract function assignTask(taskId, assignTo)

const RessignTask: React.FunctionComponent<Props> = ({
  open,
  onClose,
  taskId,
  workerAddr,
  jobAddr,
  onUpdate,
}: Props) => {
  const { signer } = useContext(EtherContext);
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle id="form-dialog-title">Task Reassignment</DialogTitle>

      <Formik
        initialValues={{
          taskId: taskId,
          workerAddr: workerAddr,
        }}
        onSubmit={async () => {
          if (signer) {
            try {
              const jobContract = Job__factory.connect(jobAddr, signer);
              const reassign = await jobContract.reAssignTask(
                BigNumber.from(taskId),
                workerAddr
              );
              await reassign.wait();
              onUpdate();
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
              <DialogContentText>
                Are you sure you want to reassign the task to this person?
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

export default RessignTask;
