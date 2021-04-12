import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  // FormControl,
  // FormControlLabel,
  // FormLabel,
  LinearProgress,
  // Radio,
  Typography,
} from "@material-ui/core";
import { Field, Form, Formik, FormikErrors, FormikValues } from "formik";
import { TextField } from "formik-material-ui";
import React, { useContext, useState } from "react";
import EtherContext from "../../../contexts/EtherContext";

interface Props {
  open: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

const CreateJob: React.FunctionComponent<Props> = ({
  open,
  onClose,
  onUpdate,
}: Props) => {
  const { jobCreatorContract } = useContext(EtherContext);
  const [error, setError] = useState(false);

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
        onSubmit={async (values) => {
          // Call JobCreator contract function deployNewJob(string calldata _title, string calldata _description)
          try {
            if (jobCreatorContract) {
              const create = await jobCreatorContract.deployNewJob(
                values.jobTitle,
                values.jobDescription
              );
              await create.wait();
            }
          } catch (e) {
            console.error(e);
            setError(true);
          }
          onUpdate();
          onClose();
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
              <Typography
                variant="caption"
                color="error"
                align="center"
                gutterBottom
              >
                **Once created, job cannot be removed!**
              </Typography>
              {isSubmitting && <LinearProgress />}
              {error && (
                <DialogContentText color="error" align="center">
                  Unable to create job at the moment!
                </DialogContentText>
              )}
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
