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
import PublishIcon from "@material-ui/icons/Publish";
import SubmitTask from "./SubmitTask/SubmitTask";

// const useStyles = makeStyles((theme) => ({
//   buttonContainer: {
//     display: "flex",
//     justifyContent: "flex-end",
//     paddingTop: "1em",
//     paddingBottom: "1em",
//   },
// }));

interface SubmitCellProps {
  row: GridRowModel;
}

const TaskList: React.FunctionComponent = () => {
  // const classes = useStyles();

  const [submitTaskOpen, setSubmitTaskOpen] = useState(false);
  const [taskIdToSubmit, setTaskIdToSubmit] = useState(0);

  const SubmitCell: React.FunctionComponent<SubmitCellProps> = ({
    row,
  }: SubmitCellProps) => {
    return (
      <IconButton
        onClick={() => {
          setTaskIdToSubmit(row.taskId);
          setSubmitTaskOpen(true);
        }}
      >
        <PublishIcon />
      </IconButton>
    );
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70, hide: true },
    {
      field: "company",
      headerName: "Company",
      width: 220,
      disableClickEventBubbling: true,
    },
    {
      field: "jobAddr",
      headerName: "Job Addr",
      width: 220,
      hide: true,
      disableClickEventBubbling: true,
    },
    {
      field: "jobTitle",
      headerName: "Job Title",
      width: 220,
      disableClickEventBubbling: true,
    },
    {
      field: "jobDescription",
      headerName: "Job Description",
      width: 330,
      disableClickEventBubbling: true,
    },
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
      field: "submit",
      width: 80,
      sortable: false,
      headerName: "Submit",
      // eslint-disable-next-line react/display-name
      renderCell: (params: GridCellParams) => <SubmitCell row={params.row} />,
      disableColumnMenu: true,
      disableClickEventBubbling: true,
    },
  ];

  const rows = [
    {
      id: 1,
      jobAddr: "0x....",
      company: "ABC Company",
      jobTitle: "ABC Developer",
      jobDescription: "Job Description",
      taskId: 1,
      taskTitle: "Backend Implementation",
      taskDescription: "Develop the backend for ....",
      compensation: 10,
    },
  ];

  return (
    <React.Fragment>
      <SubmitTask
        open={submitTaskOpen}
        onClose={() => setSubmitTaskOpen(false)}
        taskId={taskIdToSubmit}
      />
      <Typography variant="h3" gutterBottom>
        Pending Tasks
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

export default TaskList;
