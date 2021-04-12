import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  LinearProgress,
} from "@material-ui/core";
import { Job__factory } from "@payrollah/payrollah-registry";
import { Field, Form, Formik, FormikErrors, FormikValues } from "formik";
import { SimpleFileUpload } from "formik-material-ui";
import React, { useContext } from "react";
import EtherContext from "../../../contexts/EtherContext";
import axios, { AxiosResponse } from "axios";

interface Props {
  open: boolean;
  onClose: () => void;
  taskId: number;
  jobAddr: string;
}

interface IUploadResponse {
  uuid: string;
  success: boolean;
}

const SubmitTask: React.FunctionComponent<Props> = ({
  open,
  onClose,
  taskId,
  jobAddr,
}: Props) => {
  const { signer } = useContext(EtherContext);

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Submit for Task ID: {taskId}</DialogTitle>
      <Formik
        initialValues={{
          evidence: new Blob(),
          taskId: taskId,
        }}
        validate={(values) => {
          const errors: FormikErrors<FormikValues> = {};
          if (!values.evidence) {
            errors.evidence = "Required";
          }

          return errors;
        }}
        onSubmit={async (values) => {
          if (signer) {
            try {
              const bodyFormData = new FormData();
              bodyFormData.append("image", values.evidence);
              const response: AxiosResponse<IUploadResponse> = await axios({
                method: "post",
                url: "https://payrollah.herokuapp.com/work/upload",
                data: bodyFormData,
                headers: { "Content-Type": "multipart/form-data" },
              });
              if (!response.data.success)
                throw new Error("File did not upload successfully");
              const hash = response.data.uuid;
              const jobContract = Job__factory.connect(jobAddr, signer);
              const deferTx = await jobContract.submitTask(taskId, hash);
              await deferTx.wait();
              onClose();
            } catch (e) {
              console.error(e);
              onClose();
            }
          }
        }}
      >
        {({ submitForm, isSubmitting }) => (
          <Form>
            <DialogContent>
              {/* <Field
                component={TextField}
                label="Hyperlink to Work"
                name="evidence"
                fullWidth
              /> */}
              <Field
                component={SimpleFileUpload}
                name="evidence"
                fullWidth
                label="Upload work"
              />
              ;{isSubmitting && <LinearProgress />}
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
