import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  LinearProgress,
} from "@material-ui/core";
import { Field, Form, Formik, FormikErrors, FormikValues } from "formik";
import { TextField } from "formik-material-ui";
import React from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  taskId: number;
}

const SubmitTask: React.FunctionComponent<Props> = ({
  open,
  onClose,
  taskId,
}: Props) => {
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
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
            alert(JSON.stringify(values, null, 2));

            // Call Job contract function submitTask(taskId, evidence)
            onClose();
          }, 500);
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
