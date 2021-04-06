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
  taskId: number;
  workerAddr: string;
}
// Call Job contract function assignTask(taskId, assignTo)

const AssignTask: React.FunctionComponent<Props> = ({
  open,
  onClose,
  taskId,
  workerAddr,
}: Props) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle id="form-dialog-title">Task Assignment</DialogTitle>

      <Formik
        initialValues={{
          taskId: taskId,
          workerAddr: workerAddr,
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
                Are you sure you want to assign this person the task?
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

export default AssignTask;
