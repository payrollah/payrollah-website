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
import { DatePicker } from "formik-material-ui-pickers";
import moment from "moment";
import React from "react";
import {
  BIWEEKLY,
  FULL_TIME,
  MONTHLY,
  PART_TIME,
} from "../../../constants/salary";

interface Props {
  open: boolean;
  onClose: () => void;
}

const CreateEmployee: React.FunctionComponent<Props> = ({
  open,
  onClose,
}: Props) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>New Employee</DialogTitle>

      <Formik
        initialValues={{
          email: "",
          salaryAmount: 0,
          type: "fulltime",
          salaryPeriod: "monthly",
          role: "",
          startDate: moment.now(),
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

          if (!values.salaryAmount) {
            errors.salaryAmount = "Required";
          }

          if (!values.type) {
            errors.type = "Required";
          }

          if (!values.salaryPeriod) {
            errors.salaryPeriod = "Required";
          }

          if (!values.role) {
            errors.role = "Required";
          }

          if (!values.startDate) {
            errors.startDate = "Required";
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
              <Field
                component={TextField}
                name="email"
                type="email"
                label="Email"
                fullWidth
                required
              />
              <br />
              <Field
                component={TextField}
                label="Role"
                name="role"
                fullWidth
                required
              />
              <br />
              <Field
                component={TextField}
                type="number"
                label="Salary Amount"
                name="salaryAmount"
                fullWidth
                required
              />
              <br />
              <FormControl component="fieldset" required>
                <FormLabel component="legend">Salary Period</FormLabel>
                <Field component={RadioGroup} name="salaryPeriod">
                  <FormControlLabel
                    value={BIWEEKLY}
                    control={<Radio disabled={isSubmitting} />}
                    label="Biweekly"
                    disabled={isSubmitting}
                  />
                  <FormControlLabel
                    value={MONTHLY}
                    control={<Radio disabled={isSubmitting} />}
                    label="Monthly"
                    disabled={isSubmitting}
                  />
                </Field>
              </FormControl>
              <br />
              <FormControl component="fieldset" required>
                <FormLabel component="legend">Employment Type</FormLabel>
                <Field component={RadioGroup} name="type">
                  <FormControlLabel
                    value={FULL_TIME}
                    control={<Radio disabled={isSubmitting} />}
                    label="Full-time"
                    disabled={isSubmitting}
                  />
                  <FormControlLabel
                    value={PART_TIME}
                    control={<Radio disabled={isSubmitting} />}
                    label="Part-time"
                    disabled={isSubmitting}
                  />
                </Field>
              </FormControl>
              <br />
              <Field
                component={DatePicker}
                label="Start Date"
                name="startDate"
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

export default CreateEmployee;
