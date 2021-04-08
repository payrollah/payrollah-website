import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  // FormControl,
  // FormControlLabel,
  // FormLabel,
  LinearProgress,
  Typography,
} from "@material-ui/core";
import { Job__factory } from "@payrollah/payrollah-registry";
import { Field, Form, Formik, FormikErrors, FormikValues } from "formik";
import { TextField } from "formik-material-ui";
import React, { useContext } from "react";
import EtherContext from "../../../contexts/EtherContext";

interface Props {
  open: boolean;
  onClose: () => void;
  jobAddr: string;
}

const AddTask: React.FunctionComponent<Props> = ({
  open,
  onClose,
  jobAddr,
}: Props) => {
  const { signer } = useContext(EtherContext);

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>New Task</DialogTitle>

      <Formik
        initialValues={{
          taskTitle: "",
          taskDescription: "",
          compensation: 0,
        }}
        validate={(values) => {
          const errors: FormikErrors<FormikValues> = {};

          if (!values.taskTitle) {
            errors.taskTitle = "Required";
          }

          if (!values.taskDescription) {
            errors.taskDescription = "Required";
          }

          if (!values.compensation) {
            errors.compensation = "Required";
          }

          return errors;
        }}
        onSubmit={async (values) => {
          if (signer) {
            try {
              const jobContract = Job__factory.connect(jobAddr, signer);
              await jobContract.addTask(
                values.taskTitle,
                values.taskDescription,
                values.compensation
              );
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
                label="Task Title"
                name="taskTitle"
                fullWidth
              />
              <br />
              <Field
                component={TextField}
                label="Task Description"
                name="taskDescription"
                fullWidth
              />
              <br />
              <Field
                component={TextField}
                type="number"
                label="Compensation Amount"
                name="compensation"
                fullWidth
                required
              />
              <Typography
                variant="caption"
                color="error"
                align="center"
                gutterBottom
              >
                **Once created, task cannot be removed!**
              </Typography>
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

export default AddTask;
