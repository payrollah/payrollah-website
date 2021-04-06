import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import React from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  jobAddr: string;
}

const CompleteJob: React.FunctionComponent<Props> = ({
  open,
  onClose,
  jobAddr,
}: Props) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle id="form-dialog-title">Job Completed</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to close the job?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Yes
        </Button>
        <Button onClick={onClose} color="primary">
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CompleteJob;
