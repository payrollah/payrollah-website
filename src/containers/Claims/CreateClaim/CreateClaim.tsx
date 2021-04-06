import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  LinearProgress,
  Radio,
} from "@material-ui/core";
import { Field, Form, Formik, FormikErrors, FormikValues } from "formik";
import { TextField, RadioGroup } from "formik-material-ui";
import React from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const CreateClaim: React.FunctionComponent<Props> = ({
  open,
  onClose,
}: Props) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>New Claim</DialogTitle>

      <Formik
        initialValues={{
          email: "",
          timesheet: "",
          message: "",
          type: "parttime",
        }}
        validate={(values) => {
          const errors: FormikErrors<FormikValues> = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }

          if (!values.timesheet) {
            errors.timesheet = "Required";
          }

          if (!values.type) {
            errors.type = "Required";
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
            alert(JSON.stringify(values, null, 2));
          }, 500);
        }}
      >
        {({ submitForm, isSubmitting }) => (
          <Form>
            <DialogContent>
              <FormControl component="fieldset" required>
                <FormLabel component="legend">Claim Type</FormLabel>
                <Field component={RadioGroup} name="type">
                  <FormControlLabel
                    value="parttime"
                    control={<Radio disabled={isSubmitting} />}
                    label="Part-Time"
                    disabled={isSubmitting}
                  />
                  <FormControlLabel
                    value="loan"
                    control={<Radio disabled={isSubmitting} />}
                    label="Loan"
                    disabled={isSubmitting}
                  />
                </Field>
              </FormControl>
              <br />
              <Field
                component={TextField}
                type="number"
                label="Time Unit(s)"
                name="timesheet"
                fullWidth
                required
              />
              <br />
              <Field
                component={TextField}
                label="Message"
                name="messageToClaim"
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

export default CreateClaim;
