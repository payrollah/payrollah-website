import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import React from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  companyId: number;
}

// Call Job contract function disableCompany()

const DisableCompany: React.FunctionComponent<Props> = ({
  open,
  onClose,
  companyId,
}: Props) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle id="form-dialog-title">Disable Company</DialogTitle>

      <Formik
        initialValues={{
          companyId: companyId,
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
            alert(JSON.stringify(values, null, 2));
            // Call JobCreator contract function deployNewJob(string calldata _title, string calldata _description)
            onClose();
            window.location.href = "/";
          }, 500);
        }}
      >
        {({ submitForm, isSubmitting }) => (
          <Form>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to disable your company account?
              </DialogContentText>
              {isSubmitting && <LinearProgress />}
            </DialogContent>
            <DialogActions>
              <Button
                color="secondary"
                disabled={isSubmitting}
                onClick={submitForm}
              >
                Yes
              </Button>
              <Button disabled={isSubmitting} onClick={onClose} color="primary">
                No
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default DisableCompany;
