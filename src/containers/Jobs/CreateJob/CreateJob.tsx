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

const CreateJob: React.FunctionComponent<Props> = ({
  open,
  onClose,
}: Props) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>New Job</DialogTitle>

      <Formik
        initialValues={{
          jobTitle: "",
          jobDescription: "",
        }}
        validate={(values) => {
          const errors: FormikErrors<FormikValues> = {};

          if (!values.jobTitle) {
            errors.jobTitle = "Required";
          }

          if (!values.jobDescription) {
            errors.jobDescription = "Required";
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
            alert(JSON.stringify(values, null, 2));

            // Call JobCreator contract function deployNewJob(string calldata _title, string calldata _description)
          }, 500);
        }}
      >
        {({ submitForm, isSubmitting }) => (
          <Form>
            <DialogContent>
              <Field
                component={TextField}
                label="Job Title"
                name="jobTitle"
                fullWidth
              />
              <br />
              <Field
                component={TextField}
                label="Job Description"
                name="jobDescription"
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

export default CreateJob;
