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
  employeeAddress: string;
}

const RemoveEmployee: React.FunctionComponent<Props> = ({
  open,
  onClose,
  employeeAddress,
}: Props) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle id="form-dialog-title">Remove Employee</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to remove this employee from your company?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onClose} color="secondary">
          Remove
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RemoveEmployee;
