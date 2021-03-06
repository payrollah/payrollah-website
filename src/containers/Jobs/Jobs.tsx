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
import AssignmentIcon from "@material-ui/icons/Assignment";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import WorkIcon from "@material-ui/icons/Work";
import DoneIcon from "@material-ui/icons/Done";
import CreateJob from "./CreateJob/CreateJob";
import CompleteJob from "./CompleteJob/CompleteJob";
import EtherContext from "../../contexts/EtherContext";
import UserContext from "../../contexts/UserContext";
import { Job__factory } from "@payrollah/payrollah-registry";
import { Job } from "@payrollah/payrollah-registry/dist/ts/contracts";
import formatPath from "../../utils/formatPath";
import { VIEWTASKS } from "../../constants/routePaths";
import { Link } from "react-router-dom";

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

  const [completeJobOpen, setCompleteJobOpen] = useState(false);
  const [jobAddrToComplete, setJobAddrToComplete] = useState("");

  const [rows, setRows] = useState<GridRowModel[]>([]);
  const [loading, setLoading] = useState(false);

  const [count, setCount] = useState(0);

  const handleUpdate = () => setCount(count + 1);

  const { jobCreatorContract, signer } = useContext(EtherContext);
  const { address } = useContext(UserContext);

  const getJobData = async (address: string, contract: Job) => {
    const jobStatus = await contract.status();

    let statusEnum = "";
    if (jobStatus === 1) {
      statusEnum = "In Progress";
    } else if (jobStatus === 2) {
      statusEnum = "Completed";
    } else {
      statusEnum = "Created";
    }

    return {
      id: address,
      jobAddr: address,
      jobTitle: await contract.title(),
      jobDescription: await contract.description(),
      status: statusEnum,
    };
  };

  const getJobList = useCallback(() => {
    setLoading(true);
    if (jobCreatorContract && signer) {
      const transferLogFilter = jobCreatorContract.filters.JobDeployed(
        null,
        address
      );
      jobCreatorContract
        .queryFilter(transferLogFilter, 0)
        .then(async (eventList) => {
          setRows(
            await Promise.all(
              eventList.map((event) => {
                const address = event.args.jobAddress;
                const contract = Job__factory.connect(address, signer);
                return getJobData(address, contract);
              })
            )
          );
          setLoading(false);
        });
    }
  }, [address, jobCreatorContract, signer]);

  useEffect(() => {
    getJobList();
  }, [getJobList, count]);

  const ViewCell: React.FunctionComponent<ViewCellProps> = ({
    row,
  }: ViewCellProps) => {
    return (
      <Link
        to={{
          pathname: formatPath(VIEWTASKS, {
            jobAddr: row.jobAddr,
          }),
          state: { jobTitle: row.jobTitle },
        }}
      >
        <IconButton>
          <AssignmentIcon />
        </IconButton>
      </Link>
    );
  };

  const CompleteCell: React.FunctionComponent<CompleteCellProps> = ({
    row,
  }: CompleteCellProps) => {
    if (row.status === "Completed") {
      return <DoneIcon style={{ width: "100%" }} />;
    } else {
      return (
        <IconButton
          onClick={() => {
            setJobAddrToComplete(row.jobAddr);
            setCompleteJobOpen(true);
          }}
        >
          <ThumbUpIcon />
        </IconButton>
      );
    }
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
      flex: 1,
      disableClickEventBubbling: true,
    },
    {
      field: "jobDescription",
      headerName: "Job Description",
      flex: 2,
      disableClickEventBubbling: true,
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
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

  return (
    <React.Fragment>
      <CreateJob
        open={createJobOpen}
        onClose={() => setCreateJobOpen(false)}
        onUpdate={handleUpdate}
      />

      <CompleteJob
        open={completeJobOpen}
        onClose={() => setCompleteJobOpen(false)}
        jobAddr={jobAddrToComplete}
        onUpdate={handleUpdate}
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

export default Jobs;
