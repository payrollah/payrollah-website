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
  workerIdToView: number;
  workerAddrToView: string;
}

const ViewWorkerProfile: React.FunctionComponent<Props> = ({
  open,
  onClose,
  workerIdToView,
  workerAddrToView,
}: Props) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent dividers>
        <Typography gutterBottom>Worker Id: {workerIdToView}</Typography>
        <Typography gutterBottom>Worker Address: {workerAddrToView}</Typography>
      </DialogContent>
      <DialogContent dividers>
        <Typography gutterBottom>
          Work 1:{" "}
          <a href="https://www.google.com.sg/" target="_blank" rel="noreferrer">
            www.google.com.sg
          </a>
        </Typography>
        <Typography gutterBottom>
          Work 2:{" "}
          <a
            href="https://luminus.nus.edu.sg/"
            target="_blank"
            rel="noreferrer"
          >
            luminus.nus.edu.sg/
          </a>
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewWorkerProfile;
