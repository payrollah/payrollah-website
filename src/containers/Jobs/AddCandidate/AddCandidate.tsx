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
  taskId: number;
}

// Call Job contract function addCandidate(taskId)

const AddCandidate: React.FunctionComponent<Props> = ({
  open,
  onClose,
  taskId,
}: Props) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle id="form-dialog-title">Job Application</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to apply for this task?
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

export default AddCandidate;
