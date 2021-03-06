import { Button, Container, makeStyles, Typography } from "@material-ui/core";
import React, { useContext, useState } from "react";
import ViewWorkerProfile from "../Tasks/ViewCandidates/ViewWorkerProfile/ViewWorkerProfile";
import AssignmentIcon from "@material-ui/icons/Assignment";
import FaceIcon from "@material-ui/icons/Face";
import UserContext from "../../contexts/UserContext";

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    paddingTop: "1em",
    paddingBottom: "1em",
  },
  tr: {
    padding: "20px",
  },
  td: {
    padding: "20px",
    borderBottom: "1px solid grey",
  },
}));

const WorkerProfile: React.FunctionComponent = () => {
  const classes = useStyles();

  const { address, workerId } = useContext(UserContext);

  const [viewWorkerProfileOpen, setViewWorkerProfileOpen] = useState(false);
  const [workerAddrToView] = useState(address);
  const [workerIdToView] = useState(Number(workerId));

  return (
    <React.Fragment>
      <ViewWorkerProfile
        open={viewWorkerProfileOpen}
        onClose={() => setViewWorkerProfileOpen(false)}
        workerIdToView={workerIdToView}
        workerAddrToView={workerAddrToView}
      />
      <Container
        disableGutters
        maxWidth={false}
        className={classes.buttonContainer}
      >
        <FaceIcon style={{ height: 53, width: 53, paddingRight: "10px" }} />
        <Typography variant="h3" gutterBottom style={{ width: "100%" }}>
          Profile
        </Typography>
        <Button
          style={{ height: 40, width: 200 }}
          variant="contained"
          color="primary"
          endIcon={<AssignmentIcon />}
          onClick={() => setViewWorkerProfileOpen(true)}
        >
          Past Works
        </Button>
      </Container>
      <div style={{ width: "100%" }}>
        <table style={{ width: "100%" }}>
          <tr className={classes.tr}>
            <td className={classes.td}>Worker ID</td>
            <td className={classes.td}>{workerId}</td>
          </tr>
          <tr className={classes.tr}>
            <td className={classes.td}>Account Address</td>
            <td className={classes.td}>{address}</td>
          </tr>
        </table>
      </div>
    </React.Fragment>
  );
};

export default WorkerProfile;
