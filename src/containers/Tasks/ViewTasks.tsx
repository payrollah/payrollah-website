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
import PeopleIcon from "@material-ui/icons/People";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import AssignmentIcon from "@material-ui/icons/Assignment";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import WorkIcon from "@material-ui/icons/Work";
import GetAppIcon from "@material-ui/icons/GetApp";
import CloseIcon from "@material-ui/icons/Close";
import AddTask from "./AddTask/AddTask";
import ApproveTask from "./ApproveTask/ApproveTask";
import { useLocation, useParams } from "react-router";
import EtherContext from "../../contexts/EtherContext";
import { Job__factory } from "@payrollah/payrollah-registry";
import { JOBS, VIEWCANDIDATES } from "../../constants/routePaths";
import { Link } from "react-router-dom";
import formatPath from "../../utils/formatPath";
import { BigNumber } from "@ethersproject/bignumber";
import { ethers } from "ethers";
interface ViewTaskParams {
  jobAddr: string;
}

interface ViewCellProps {
  row: GridRowModel;
}

interface LinkCellProps {
  row: GridRowModel;
}

interface ApproveCellProps {
  row: GridRowModel;
}

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    paddingTop: "1em",
    paddingBottom: "1em",
  },
}));

// const jobTitle = "Job Title";

const ViewTasks: React.FunctionComponent = () => {
  const classes = useStyles();

  const { jobAddr } = useParams<ViewTaskParams>();

  const { state } = useLocation<any>();
  const jobTitle = state.jobTitle;

  const { taskContract, signer } = useContext(EtherContext);

  const [addTaskOpen, setAddTaskOpen] = useState(false);

  const [approveTaskOpen, setApproveTaskOpen] = useState(false);
  const [taskIdToApprove, setTaskIdToApprove] = useState(0);

  const [rows, setRows] = useState<GridRowModel[]>([]);
  const [loading, setLoading] = useState(false);

  const getTaskList = useCallback(() => {
    setLoading(true);
    if (taskContract && signer) {
      // get task list
      const jobContract = Job__factory.connect(jobAddr, signer);
      try {
        jobContract.getTasks().then(async (taskIds: BigNumber[]) => {
          setRows(
            await Promise.all(
              taskIds.map(async (taskId: BigNumber) => {
                const task = await taskContract.tasks(taskId);
                return {
                  id: taskId.toNumber(),
                  taskId: taskId.toNumber(),
                  taskTitle: task.title,
                  taskDescription: task.description,
                  compensation: task.compensation.toNumber(),
                  status: task.isComplete ? "Completed" : "In Progress",
                  assignedTo:
                    task.assignedTo === ethers.constants.AddressZero
                      ? "Not Assigned"
                      : task.assignedTo,
                  evidence: task.evidence,
                };
              })
            )
          );
          setLoading(false);
        });
      } catch (e) {
        console.error(e);
      }
    }
    setLoading(false);
  }, [signer, jobAddr, taskContract]);

  useEffect(() => {
    getTaskList();
  }, [getTaskList]);

  const ViewCell: React.FunctionComponent<ViewCellProps> = ({
    row,
  }: ViewCellProps) => {
    return (
      <Link
        to={{
          pathname: formatPath(VIEWCANDIDATES, {
            jobAddr: jobAddr,
            taskId: row.taskId,
          }),
          state: {
            taskTitle: row.taskTitle,
          },
        }}
      >
        <IconButton>
          <PeopleIcon />
        </IconButton>
      </Link>
    );
  };

  const LinkCell: React.FunctionComponent<LinkCellProps> = ({
    row,
  }: LinkCellProps) => {
    if (!!row.evidence) {
      // Have evidence
      return (
        <IconButton
          onClick={() => {
            window.open(row.evidence);
          }}
        >
          <GetAppIcon />
        </IconButton>
      );
    } else {
      // No evidence
      return <CloseIcon style={{ width: "100%" }} />;
    }
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
      width: 120,
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
      width: 120,
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

  return (
    <React.Fragment>
      <AddTask
        open={addTaskOpen}
        onClose={() => setAddTaskOpen(false)}
        jobAddr={jobAddr}
      />
      <ApproveTask
        open={approveTaskOpen}
        onClose={() => setApproveTaskOpen(false)}
        taskId={taskIdToApprove}
        jobAddr={jobAddr}
      />
      <Container
        disableGutters
        maxWidth={false}
        className={classes.buttonContainer}
      >
        <Typography variant="h3" gutterBottom style={{ width: "100%" }}>
          Tasks for [{jobTitle}]
        </Typography>
        <Link to={JOBS} style={{ textDecoration: "none" }}>
          <Button
            style={{ height: 40, width: 230 }}
            variant="outlined"
            color="primary"
            endIcon={<WorkIcon />}
            startIcon={<ArrowBackIcon />}
          >
            Back to Jobs
          </Button>
        </Link>
      </Container>
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
          loading={loading}
        />
      </div>
    </React.Fragment>
  );
};

export default ViewTasks;
