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
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import AssignmentIcon from "@material-ui/icons/Assignment";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import WorkIcon from "@material-ui/icons/Work";
import GetAppIcon from "@material-ui/icons/GetApp";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
import AddTask from "./AddTask/AddTask";
import ApproveTask from "./ApproveTask/ApproveTask";
import RejectTask from "./RejectTask/RejectTask";
import { useLocation, useParams } from "react-router";
import EtherContext from "../../contexts/EtherContext";
import { Job__factory } from "@payrollah/payrollah-registry";
import { JOBS, VIEWCANDIDATES } from "../../constants/routePaths";
import { Link } from "react-router-dom";
import formatPath from "../../utils/formatPath";
import { BigNumber } from "@ethersproject/bignumber";
import { ethers } from "ethers";
import ImageModal from "./ImageModal/ImageModal";
import { ExternalLinkEtherscanAddress } from "./ExternalLink";

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

interface RejectCellProps {
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

  const [rejectTaskOpen, setRejectTaskOpen] = useState(false);
  const [taskIdToReject, setTaskIdToReject] = useState(0);

  const [imageOpen, setImageOpen] = useState(false);
  const [taskIdImg, setTaskIdImg] = useState(0);

  const [rows, setRows] = useState<GridRowModel[]>([]);
  const [loading, setLoading] = useState(false);

  const [count, setCount] = useState(0);

  const handleUpdate = () => setCount(count + 1);

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
                  isComplete: task.isComplete,
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
  }, [getTaskList, count]);

  const ViewCell: React.FunctionComponent<ViewCellProps> = ({
    row,
  }: ViewCellProps) => {
    if (!!row.evidence) {
      return (
        <IconButton disabled={true}>
          <PeopleIcon />
        </IconButton>
      );
    } else {
      return (
        <Link
          to={{
            pathname: formatPath(VIEWCANDIDATES, {
              jobAddr: jobAddr,
              taskId: row.taskId,
            }),
            state: {
              taskTitle: row.taskTitle,
              assignedTo: row.assignedTo,
            },
          }}
        >
          <IconButton>
            <PeopleIcon />
          </IconButton>
        </Link>
      );
    }
  };

  const LinkCell: React.FunctionComponent<LinkCellProps> = ({
    row,
  }: LinkCellProps) => {
    // Have evidence
    if (!!row.evidence) {
      if (row.isComplete === false) {
        // returns watermark
        return (
          <IconButton
            onClick={() => {
              window.open(
                `https://payrollah.herokuapp.com/work/watermark/${row.evidence}`
              );
            }}
          >
            <GetAppIcon />
          </IconButton>
        );
      } else {
        //return actual work
        return (
          <IconButton
            onClick={() => {
              setTaskIdImg(row.taskId);
              setImageOpen(true);
            }}
          >
            <GetAppIcon />
          </IconButton>
        );
      }
    } else {
      // No evidence
      return <CloseIcon style={{ width: "100%" }} />;
    }
  };

  const ApproveCell: React.FunctionComponent<ApproveCellProps> = ({
    row,
  }: ApproveCellProps) => {
    if (row.isComplete === false) {
      if (!!row.evidence) {
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
      } else {
        return (
          <IconButton disabled={true}>
            <ThumbUpIcon />
          </IconButton>
        );
      }
    } else {
      return <DoneIcon style={{ width: "100%" }} />;
    }
  };

  const RejectCell: React.FunctionComponent<RejectCellProps> = ({
    row,
  }: RejectCellProps) => {
    if (row.isComplete === false) {
      if (!!row.evidence) {
        return (
          <IconButton
            onClick={() => {
              setTaskIdToReject(row.taskId);
              setRejectTaskOpen(true);
            }}
          >
            <ThumbDownIcon />
          </IconButton>
        );
      } else {
        return (
          <IconButton disabled={true}>
            <ThumbDownIcon />
          </IconButton>
        );
      }
    } else {
      return <DoneIcon style={{ width: "100%" }} />;
    }
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
      width: 120,
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
      width: 140,
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
      width: 90,
      sortable: false,
      headerName: "Accept",
      // eslint-disable-next-line react/display-name
      renderCell: (params: GridCellParams) => <ApproveCell row={params.row} />,
      disableColumnMenu: true,
      disableClickEventBubbling: true,
    },
    {
      field: "reject",
      width: 90,
      sortable: false,
      headerName: "Reject",
      // eslint-disable-next-line react/display-name
      renderCell: (params: GridCellParams) => <RejectCell row={params.row} />,
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
        onUpdate={handleUpdate}
      />
      <ApproveTask
        open={approveTaskOpen}
        onClose={() => setApproveTaskOpen(false)}
        taskId={taskIdToApprove}
        jobAddr={jobAddr}
        onUpdate={handleUpdate}
      />
      <RejectTask
        open={rejectTaskOpen}
        onClose={() => setRejectTaskOpen(false)}
        taskId={taskIdToReject}
        jobAddr={jobAddr}
        onUpdate={handleUpdate}
      />
      <ImageModal
        open={imageOpen}
        taskId={taskIdImg}
        onClose={() => setImageOpen(false)}
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
        Job Address:{" "}
        <ExternalLinkEtherscanAddress name={jobAddr} address={jobAddr} />
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
          autoHeight={true}
          rows={rows}
          columns={columns}
          pageSize={10}
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
