import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
  Typography,
} from "@material-ui/core";
import { Field, Form, Formik, FormikErrors, FormikValues } from "formik";
import { TextField } from "formik-material-ui";
import React from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  claimId: number;
}

const RejectClaim: React.FunctionComponent<Props> = ({
  open,
  onClose,
  claimId,
}: Props) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle id="form-dialog-title">Reject Claim</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography gutterBottom>
            Are you sure you want to reject this claim?
          </Typography>
        </DialogContentText>
      </DialogContent>

      <Formik
        initialValues={{
          messageToReject: "",
        }}
        validate={(values) => {
          const errors: FormikErrors<FormikValues> = {};

          if (!values.messageToReject) {
            errors.messageToReject = "Required";
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
                label="Message"
                name="messageToReject"
                fullWidth
                required
              />
              {isSubmitting && <LinearProgress />}
            </DialogContent>
            <DialogActions>
              <Button
                color="primary"
                disabled={isSubmitting}
                onClick={submitForm}
              >
                Reject
              </Button>
              <Button disabled={isSubmitting} onClick={onClose}>
                Close
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default RejectClaim;
