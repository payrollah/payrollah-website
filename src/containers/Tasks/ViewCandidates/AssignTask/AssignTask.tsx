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
  workerAddr: string;
}
// Call Job contract function assignTask(taskId, assignTo)

const AssignTask: React.FunctionComponent<Props> = ({
  open,
  onClose,
  taskId,
  workerAddr,
}: Props) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle id="form-dialog-title">Task Assignment</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to assign this person the task?
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

export default AssignTask;
