import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  LinearProgress,
  makeStyles,
  Modal,
  Paper,
  Radio,
  Typography,
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

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  buttonRight: {
    marginLeft: "0.75rem",
  },
  buttonLeft: {
    marginRight: "0.75rem",
  },
}));

const EditEmployeeSalary: React.FunctionComponent<Props> = ({
  open,
  onClose,
  currSalaryAmount,
  currSalaryPeriod,
}: Props) => {
  const classes = useStyles();
  return (
    <Modal
      open={open}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper className={classes.paper}>
        <Typography variant="h5" gutterBottom>
          Update Employee Salary
        </Typography>
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
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="contained"
                  disabled={isSubmitting}
                  onClick={onClose}
                  className={classes.buttonLeft}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting || !dirty}
                  onClick={submitForm}
                  className={classes.buttonRight}
                >
                  Submit
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Paper>
    </Modal>
  );
};

export default EditEmployeeSalary;
