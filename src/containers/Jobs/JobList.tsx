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
// import AssignmentIcon from "@material-ui/icons/Assignment";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import AddCandidate from "./AddCandidate/AddCandidate";

// const useStyles = makeStyles((theme) => ({
//   buttonContainer: {
//     display: "flex",
//     justifyContent: "flex-end",
//     paddingTop: "1em",
//     paddingBottom: "1em",
//   },
// }));

interface AddCellProps {
  row: GridRowModel;
}

const JobList: React.FunctionComponent = () => {
  // const classes = useStyles();

  const [addCandidateOpen, setAddCandidateOpen] = useState(false);
  const [taskIdToAdd, setTaskIdToAdd] = useState(0);

  const AddCell: React.FunctionComponent<AddCellProps> = ({
    row,
  }: AddCellProps) => {
    return (
      <IconButton
        onClick={() => {
          setTaskIdToAdd(row.taskId);
          setAddCandidateOpen(true);
        }}
      >
        <ThumbUpIcon />
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
      field: "add",
      width: 70,
      sortable: false,
      headerName: "Apply",
      // eslint-disable-next-line react/display-name
      renderCell: (params: GridCellParams) => <AddCell row={params.row} />,
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
      <AddCandidate
        open={addCandidateOpen}
        onClose={() => setAddCandidateOpen(false)}
        taskId={taskIdToAdd}
      />
      <Typography variant="h3" gutterBottom>
        Available Jobs
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

export default JobList;
