import {
  // Button,
  // Container,
  IconButton,
  // makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
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
import ViewWorkerProfile from "./ViewWorkerProfile/ViewWorkerProfile";

// const useStyles = makeStyles((theme) => ({
//   buttonContainer: {
//     display: "flex",
//     justifyContent: "flex-end",
//     paddingTop: "1em",
//     paddingBottom: "1em",
//   },
// }));

const taskTitle = "Task Title";

const taskId = new URLSearchParams(window.location.search).get("task");

const ViewCandidates: React.FunctionComponent = () => {
  // const classes = useStyles();

  interface ViewCellProps {
    row: GridRowModel;
  }

  interface AssignCellProps {
    row: GridRowModel;
  }

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

  const rows = [
    {
      id: 1,
      workerId: 1,
      workerAddr: "0xfC16D162C6a9Ff85346cB42176428c26278F09D1",
    },
  ];

  return (
    <React.Fragment>
      <AssignTask
        open={assignTaskOpen}
        onClose={() => setAssignTaskOpen(false)}
        taskId={taskIdToAssign}
        workerAddr={workerAddrToAssign}
      />
      <ViewWorkerProfile
        open={viewWorkerProfileOpen}
        onClose={() => setViewWorkerProfileOpen(false)}
        workerIdToView={workerIdToView}
        workerAddrToView={workerAddrToView}
      />
      <Typography variant="h3" gutterBottom>
        Candidates for [{taskTitle}]
      </Typography>
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
        />
      </div>
    </React.Fragment>
  );
};

export default ViewCandidates;
