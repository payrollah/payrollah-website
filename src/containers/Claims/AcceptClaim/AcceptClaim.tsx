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
  claimId: number;
}

const AcceptClaim: React.FunctionComponent<Props> = ({
  open,
  onClose,
  claimId,
}: Props) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle id="form-dialog-title">Accept Claim</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to accept this claim?
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

export default AcceptClaim;
