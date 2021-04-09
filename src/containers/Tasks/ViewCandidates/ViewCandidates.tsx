import {
  Button,
  Container,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridToolbar,
  GridRowModel,
} from "@material-ui/data-grid";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import AssignTask from "./AssignTask/AssignTask";
import AssignmentIcon from "@material-ui/icons/Assignment";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ViewWorkerProfile from "./ViewWorkerProfile/ViewWorkerProfile";
import { useHistory, useLocation, useParams } from "react-router";
import EtherContext from "../../../contexts/EtherContext";

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    paddingTop: "1em",
    paddingBottom: "1em",
  },
}));

interface ViewCellProps {
  row: GridRowModel;
}

interface AssignCellProps {
  row: GridRowModel;
}

interface ViewCandidatesParams {
  jobAddr: string;
  taskId: string;
}

const ViewCandidates: React.FunctionComponent = () => {
  const classes = useStyles();

  const { jobAddr, taskId: taskIdString } = useParams<ViewCandidatesParams>();
  const taskId = Number(taskIdString);

  const { state } = useLocation<any>();
  const { taskTitle } = state;

  const history = useHistory();

  const { taskContract, workerContract, signer } = useContext(EtherContext);

  const [rows, setRows] = useState<GridRowModel[]>([]);
  const [loading, setLoading] = useState(false);

  const getCandidateList = useCallback(() => {
    setLoading(true);
    if (taskContract && workerContract && signer) {
      // get candidate list
      try {
        taskContract
          .getCandidateByTask(taskId)
          .then(async (candidateAddresses: string[]) => {
            setRows(
              await Promise.all(
                candidateAddresses.map(async (candidateAddr) => {
                  const candidateId = (
                    await workerContract.getWorkerIdByAddress(candidateAddr)
                  ).toNumber();
                  return {
                    id: candidateId,
                    workerId: candidateId,
                    workerAddr: candidateAddr,
                    taskId: taskId,
                  };
                })
              )
            );
          });
        setLoading(false);
      } catch (e) {
        console.error(e);
      }
    }
    setLoading(false);
  }, [signer, taskContract, workerContract, taskId]);

  useEffect(() => {
    getCandidateList();
  }, [getCandidateList]);

  const [viewWorkerProfileOpen, setViewWorkerProfileOpen] = useState(false);
  const [workerAddrToView, setWorkerAddrToView] = useState("");
  const [workerIdToView, setWorkerIdToView] = useState(0);

  const [assignTaskOpen, setAssignTaskOpen] = useState(false);
  const [taskIdToAssign, setTaskIdToAssign] = useState(0);
  const [workerAddrToAssign, setWorkerAddrToAssign] = useState("");

  const ViewCell: React.FunctionComponent<ViewCellProps> = ({
    row,
  }: ViewCellProps) => {
    return (
      <IconButton
        onClick={() => {
          setWorkerAddrToView(row.workerAddr);
          setWorkerIdToView(row.workerId);
          setViewWorkerProfileOpen(true);
        }}
      >
        <AccountBoxIcon />
      </IconButton>
    );
  };

  const AssignCell: React.FunctionComponent<AssignCellProps> = ({
    row,
  }: AssignCellProps) => {
    return (
      <IconButton
        onClick={() => {
          setWorkerAddrToAssign(row.workerAddr);
          setTaskIdToAssign(row.taskId);
          setAssignTaskOpen(true);
        }}
      >
        <ThumbUpIcon />
      </IconButton>
    );
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "workerId", headerName: "workerId", width: 70, hide: true },
    {
      field: "workerAddr",
      headerName: "Worker Address",
      width: 500,
      disableClickEventBubbling: true,
    },
    {
      field: "viewWorkerProfile",
      width: 120,
      sortable: false,
      headerName: "View Profile",
      // eslint-disable-next-line react/display-name
      renderCell: (params: GridCellParams) => <ViewCell row={params.row} />,
      disableColumnMenu: true,
      disableClickEventBubbling: true,
    },
    {
      field: "assign",
      width: 100,
      sortable: false,
      headerName: "Assign",
      // eslint-disable-next-line react/display-name
      renderCell: (params: GridCellParams) => <AssignCell row={params.row} />,
      disableColumnMenu: true,
      disableClickEventBubbling: true,
    },
  ];

  return (
    <React.Fragment>
      <AssignTask
        open={assignTaskOpen}
        onClose={() => setAssignTaskOpen(false)}
        taskId={taskIdToAssign}
        workerAddr={workerAddrToAssign}
        jobAddr={jobAddr}
      />
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
        <Typography variant="h3" gutterBottom style={{ width: "100%" }}>
          Candidates for [{taskTitle}]
        </Typography>
        <Button
          style={{ height: 40, width: 250 }}
          variant="outlined"
          color="primary"
          endIcon={<AssignmentIcon />}
          startIcon={<ArrowBackIcon />}
          onClick={history.goBack}
        >
          Back to Tasks
        </Button>
      </Container>
      <Typography variant="subtitle1" gutterBottom>
        Task ID: {taskId}
      </Typography>
      <div style={{ height: 400, width: "100%", textAlign: "center" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          components={{
            Toolbar: GridToolbar,
          }}
          loading={loading}
        />
      </div>
    </React.Fragment>
  );
};

export default ViewCandidates;
