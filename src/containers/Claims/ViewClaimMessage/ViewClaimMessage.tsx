import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  // DialogContentText,
  // DialogTitle,
  Typography,
} from "@material-ui/core";
import React from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  messageToClaim: string;
  messageToReject: string;
}

const ViewClaimMessage: React.FunctionComponent<Props> = ({
  open,
  onClose,
  messageToClaim,
  messageToReject,
}: Props) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent dividers>
        <Typography gutterBottom>Claim Message:</Typography>
        <Typography gutterBottom>{messageToClaim}</Typography>
      </DialogContent>
      <DialogContent dividers>
        <Typography gutterBottom>Rejection Message:</Typography>
        <Typography gutterBottom>{messageToReject}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewClaimMessage;
