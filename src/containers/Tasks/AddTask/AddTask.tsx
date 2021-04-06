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
  // Radio,
} from "@material-ui/core";
import { Field, Form, Formik, FormikErrors, FormikValues } from "formik";
import { TextField } from "formik-material-ui";
import React from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const AddTask: React.FunctionComponent<Props> = ({ open, onClose }: Props) => {
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
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
            alert(JSON.stringify(values, null, 2));

            // Call Job contract function addTaks(title, description, compensation)
          }, 500);
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
