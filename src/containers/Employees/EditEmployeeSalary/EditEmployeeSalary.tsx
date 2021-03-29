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
import { BIWEEKLY, MONTHLY } from "../../../constants/salary";

interface Props {
  open: boolean;
  onClose: () => void;
  currSalaryAmount: number;
  currSalaryPeriod: string;
  employeeAddress: string;
}

const EditEmployeeSalary: React.FunctionComponent<Props> = ({
  open,
  onClose,
  currSalaryAmount,
  currSalaryPeriod,
}: Props) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Update Employee Salary</DialogTitle>
      <Formik
        initialValues={{
          salaryAmount: currSalaryAmount,
          salaryPeriod: currSalaryPeriod,
        }}
        validate={(values) => {
          const errors: FormikErrors<FormikValues> = {};

          if (!values.salaryAmount) {
            errors.salaryAmount = "Required";
          }

          if (!values.salaryPeriod) {
            errors.salaryPeriod = "Required";
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
        {({ submitForm, isSubmitting, dirty }) => (
          <Form>
            <DialogContent>
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
              {isSubmitting && <LinearProgress />}
            </DialogContent>
            <DialogActions>
              <Button disabled={isSubmitting} onClick={onClose}>
                Cancel
              </Button>
              <Button
                color="primary"
                disabled={isSubmitting || !dirty}
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

export default EditEmployeeSalary;
