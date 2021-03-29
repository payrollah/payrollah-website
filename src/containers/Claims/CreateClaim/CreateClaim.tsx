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
import { DatePicker } from "formik-material-ui-pickers";
import moment from "moment";
import React from "react";

interface Props {
  open: boolean;
  onClose: () => void;
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

const CreateClaim: React.FunctionComponent<Props> = ({
  open,
  onClose,
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
          New Claim
        </Typography>
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
                required
              />
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
                  disabled={isSubmitting}
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

export default CreateClaim;
