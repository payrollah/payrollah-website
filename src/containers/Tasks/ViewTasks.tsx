import {
  Button,
  Container,
  IconButton,
  makeStyles,
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
import PeopleIcon from "@material-ui/icons/People";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import AssignmentIcon from "@material-ui/icons/Assignment";
import GetAppIcon from "@material-ui/icons/GetApp";
import AddTask from "./AddTask/AddTask";
import ApproveTask from "./ApproveTask/ApproveTask";

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    paddingTop: "1em",
    paddingBottom: "1em",
  },
}));

const jobTitle = "Job Title";

const jobAddr = new URLSearchParams(window.location.search).get("job");

const ViewTasks: React.FunctionComponent = () => {
  const classes = useStyles();

  interface ViewCellProps {
    row: GridRowModel;
  }

  interface LinkCellProps {
    row: GridRowModel;
  }

  interface ApproveCellProps {
    row: GridRowModel;
  }

  const [addTaskOpen, setAddTaskOpen] = useState(false);

  const [approveTaskOpen, setApproveTaskOpen] = useState(false);
  const [taskIdToApprove, setTaskIdToApprove] = useState(0);

  const ViewCell: React.FunctionComponent<ViewCellProps> = ({
    row,
  }: ViewCellProps) => {
    return (
      <IconButton
        onClick={() => {
          window.location.href = "/candidates?task=" + row.taskId;
        }}
      >
        <PeopleIcon />
      </IconButton>
    );
  };

  const LinkCell: React.FunctionComponent<LinkCellProps> = ({
    row,
  }: LinkCellProps) => {
    return (
      <IconButton
        onClick={() => {
          window.open(row.evidence);
        }}
      >
        <GetAppIcon />
      </IconButton>
    );
  };

  const ApproveCell: React.FunctionComponent<ApproveCellProps> = ({
    row,
  }: ApproveCellProps) => {
    return (
      <IconButton
        onClick={() => {
          setTaskIdToApprove(row.taskId);
          setApproveTaskOpen(true);
        }}
      >
        <ThumbUpIcon />
      </IconButton>
    );
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70, hide: true },
    { field: "taskId", headerName: "taskId", width: 70, hide: true },
    {
      field: "taskTitle",
      headerName: "Task Title",
      width: 220,
      disableClickEventBubbling: true,
    },
    {
      field: "taskDescription",
      headerName: "Task Description",
      width: 330,
      disableClickEventBubbling: true,
    },
    {
      field: "compensation",
      headerName: "Amount",
      width: 120,
      type: "number",
      disableClickEventBubbling: true,
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      disableClickEventBubbling: true,
    },
    {
      field: "viewCandidates",
      width: 110,
      sortable: false,
      headerName: "Candidates",
      // eslint-disable-next-line react/display-name
      renderCell: (params: GridCellParams) => <ViewCell row={params.row} />,
      disableColumnMenu: true,
      disableClickEventBubbling: true,
    },
    {
      field: "assignedTo",
      headerName: "Hiree",
      width: 100,
      disableClickEventBubbling: true,
    },
    {
      field: "evidence",
      headerName: "Work",
      width: 90,
      // eslint-disable-next-line react/display-name
      renderCell: (params: GridCellParams) => <LinkCell row={params.row} />,
      disableClickEventBubbling: true,
    },
    {
      field: "complete",
      width: 70,
      sortable: false,
      headerName: "Done",
      // eslint-disable-next-line react/display-name
      renderCell: (params: GridCellParams) => <ApproveCell row={params.row} />,
      disableColumnMenu: true,
      disableClickEventBubbling: true,
    },
  ];

  const rows = [
    {
      id: 1,
      taskId: 1,
      taskTitle: "ABC Company",
      taskDescription: "ABC Company",
      compensation: 10,
      status: "Pending",
      assignedTo: "0xfC16D162C6a9Ff85346cB42176428c26278F09D1",
      evidence: "https://www.google.com.sg",
    },
  ];

  return (
    <React.Fragment>
      <AddTask open={addTaskOpen} onClose={() => setAddTaskOpen(false)} />
      <ApproveTask
        open={approveTaskOpen}
        onClose={() => setApproveTaskOpen(false)}
        taskId={taskIdToApprove}
      />
      <Typography variant="h3" gutterBottom>
        Tasks for [{jobTitle}]
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Job Address: {jobAddr}
      </Typography>
      <Container
        disableGutters
        maxWidth={false}
        className={classes.buttonContainer}
      >
        <Button
          variant="contained"
          color="primary"
          endIcon={<AssignmentIcon />}
          onClick={() => setAddTaskOpen(true)}
        >
          New Task
        </Button>
      </Container>
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

export default ViewTasks;
