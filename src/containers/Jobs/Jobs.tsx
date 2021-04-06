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
import AssignmentIcon from "@material-ui/icons/Assignment";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import WorkIcon from "@material-ui/icons/Work";
import CreateJob from "./CreateJob/CreateJob";
import CompleteJob from "./CompleteJob/CompleteJob";
// import ViewJob from "../Tasks/ViewJob";

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

interface CompleteCellProps {
  row: GridRowModel;
}

const Jobs: React.FunctionComponent = () => {
  const classes = useStyles();

  const [createJobOpen, setCreateJobOpen] = useState(false);

  // const [viewJobOpen, setViewJobOpen] = useState(false);
  // const [jobTitleToView, setJobTitleToView] = useState("");
  // const [jobAddrToView, setJobAddrToView] = useState("");

  const [completeJobOpen, setCompleteJobOpen] = useState(false);
  const [jobAddrToComplete, setJobAddrToComplete] = useState("");

  const ViewCell: React.FunctionComponent<ViewCellProps> = ({
    row,
  }: ViewCellProps) => {
    return (
      <IconButton
        onClick={() => {
          // setJobTitleToView(row.jobTitle);
          // setJobAddrToView(row.jobAddr);
          // setViewJobOpen(true);
        }}
      >
        <AssignmentIcon />
      </IconButton>
    );
  };

  const CompleteCell: React.FunctionComponent<CompleteCellProps> = ({
    row,
  }: CompleteCellProps) => {
    return (
      <IconButton
        onClick={() => {
          setJobAddrToComplete(row.jobAddress);
          setCompleteJobOpen(true);
        }}
      >
        <ThumbUpIcon />
      </IconButton>
    );
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70, hide: true },
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
    {
      field: "numRemainingTasks",
      headerName: "Remaining Tasks",
      width: 165,
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
      field: "viewJob",
      width: 70,
      sortable: false,
      headerName: "View",
      // eslint-disable-next-line react/display-name
      renderCell: (params: GridCellParams) => <ViewCell row={params.row} />,
      disableColumnMenu: true,
      disableClickEventBubbling: true,
    },
    {
      field: "complete",
      width: 70,
      sortable: false,
      headerName: "Done",
      // eslint-disable-next-line react/display-name
      renderCell: (params: GridCellParams) => <CompleteCell row={params.row} />,
      disableColumnMenu: true,
      disableClickEventBubbling: true,
    },
  ];

  const rows = [
    {
      id: 1,
      jobAddr: "0x....",
      jobTitle: "ABC Company",
      jobDescription: "ABC Company",
      numRemainingTasks: 2,
      status: "Created",
    },
  ];

  // <ViewJob
  //   open={viewJobOpen}
  //   onClose={() => setViewJobOpen(false)}
  //   jobTitle={jobTitleToView}
  //   jobAddr={jobAddrToView}
  // />

  return (
    <React.Fragment>
      <CreateJob open={createJobOpen} onClose={() => setCreateJobOpen(false)} />

      <CompleteJob
        open={completeJobOpen}
        onClose={() => setCompleteJobOpen(false)}
        jobAddr={jobAddrToComplete}
      />
      <Typography variant="h3" gutterBottom>
        Jobs
      </Typography>
      <Container
        disableGutters
        maxWidth={false}
        className={classes.buttonContainer}
      >
        <Button
          variant="contained"
          color="primary"
          endIcon={<WorkIcon />}
          onClick={() => setCreateJobOpen(true)}
        >
          New Job
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

export default Jobs;
