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
import AddTask from "./AddTask/AddTask";
import ApproveTask from "./ApproveTask/ApproveTask";
// import ViewCandidates from "./ViewCandidates/ViewCandidates";

interface Props {
  open: boolean;
  onClose: () => void;
  jobTitle: string;
  jobAddr: string;
}

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    paddingTop: "1em",
    paddingBottom: "1em",
  },
}));

const ViewTasks: React.FunctionComponent<Props> = ({
  open,
  onClose,
  jobTitle = "jobTitle",
  jobAddr,
}: Props) => {
  const classes = useStyles();

  interface ViewCellProps {
    row: GridRowModel;
  }

  interface ApproveCellProps {
    row: GridRowModel;
  }

  const [addTaskOpen, setAddTaskOpen] = useState(false);

  // const [viewCandidatesOpen, setViewCandidatesOpen] = useState(false);
  // const [taskTitleToView, setTaskTitleToView] = useState("");
  // const [taskIdToView, setTaskIdToView] = useState(0);

  const [approveTaskOpen, setApproveTaskOpen] = useState(false);
  const [taskIdToApprove, setTaskIdToApprove] = useState(0);

  const ViewCell: React.FunctionComponent<ViewCellProps> = ({
    row,
  }: ViewCellProps) => {
    return (
      <IconButton
        onClick={() => {
          // setTaskTitleToView(row.jobTitle);
          // setTaskIdToView(row.taskId);
          // setViewCandidatesOpen(true);
        }}
      >
        <PeopleIcon />
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
    { field: "taskId", headerName: "taskI", width: 70, hide: true },
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
      assignedTo: "0x...",
      evidence: "hyperlink",
    },
  ];

  // <ViewCandidates
  //   open={viewCandidatesOpen}
  //   onClose={() => setViewCandidatesOpen(false)}
  //   taskTitle={taskTitleToView}
  //   taskId={taskIdToView}
  // />

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
