import {
  // Button,
  // Container,
  IconButton,
  // makeStyles,
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
import NotInterestedIcon from "@material-ui/icons/NotInterested";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import AddCandidate from "./AddCandidate/AddCandidate";
import { Job__factory } from "@payrollah/payrollah-registry";
import { Job } from "@payrollah/payrollah-registry/dist/ts/contracts";
import EtherContext from "../../contexts/EtherContext";
import UserContext from "../../contexts/UserContext";
import { BigNumber } from "@ethersproject/bignumber";
import { flatten } from "lodash";
import { Link } from "react-router-dom";
import formatPath from "../../utils/formatPath";
import { VIEW_COMPANY } from "../../constants/routePaths";

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

interface CompanyCellProps {
  row: GridRowModel;
  value: any;
}

const JobList: React.FunctionComponent = () => {
  // const classes = useStyles();

  const [addCandidateOpen, setAddCandidateOpen] = useState(false);
  const [taskIdToAdd, setTaskIdToAdd] = useState(0);
  const [jobAddrToAdd, setJobAddrToAdd] = useState("");

  const [rows, setRows] = useState<GridRowModel[]>([]);
  const [loading, setLoading] = useState(false);

  const [count, setCount] = useState(0);

  const handleUpdate = () => setCount(count + 1);

  const { address } = useContext(UserContext);

  const {
    jobCreatorContract,
    taskContract,
    companyContract,
    signer,
  } = useContext(EtherContext);

  const getJobData = useCallback(
    async (jobAddr: string, contract: Job) => {
      if (!taskContract || !companyContract) return [];

      return await contract.getTasks().then(async (taskIds: BigNumber[]) => {
        return await Promise.all(
          taskIds.map(async (taskId) => {
            const task = await taskContract.tasks(taskId);
            const isCandidate = await taskContract.isCandidate(
              taskId.toNumber(),
              address
            );

            const companyId = await contract
              .jobOwner()
              .then((ownerAddr) =>
                companyContract.getCompanyIdByAddress(ownerAddr)
              );

            return {
              id: taskId.toNumber(),
              jobAddr: jobAddr,
              companyId,
              company: (await companyContract.companies(companyId)).name,
              jobTitle: await contract.title(),
              jobDescription: await contract.description(),
              taskId: taskId.toNumber(),
              taskTitle: task.title,
              taskDescription: task.description,
              compensation: task.compensation.toNumber(),
              assignedTo: task.assignedTo,
              isComplete: task.isComplete,
              isCandidate: isCandidate,
            };
          })
        );
      });
    },
    [companyContract, taskContract, address]
  );

  const getJobList = useCallback(() => {
    setLoading(true);
    if (jobCreatorContract && taskContract && signer) {
      const transferLogFilter = jobCreatorContract.filters.JobDeployed(
        null,
        null
      );
      jobCreatorContract
        .queryFilter(transferLogFilter, 0)
        .then(async (eventList) => {
          setRows(
            flatten(
              await Promise.all(
                eventList.map((event) => {
                  const address = event.args.jobAddress;
                  const contract = Job__factory.connect(address, signer);
                  return getJobData(address, contract);
                })
              )
            )
          );
          setLoading(false);
        });
    }
  }, [jobCreatorContract, signer, getJobData, taskContract]);

  useEffect(() => {
    getJobList();
  }, [getJobList, count]);

  const AddCell: React.FunctionComponent<AddCellProps> = ({
    row,
  }: AddCellProps) => {
    if (Number(row.assignedTo) !== 0 || row.isComplete || row.isCandidate) {
      // Assigned or completed
      return <NotInterestedIcon style={{ width: "100%" }} />;
    } else {
      // Available to apply
      return (
        <IconButton
          onClick={() => {
            setTaskIdToAdd(row.taskId);
            setJobAddrToAdd(row.jobAddr);
            setAddCandidateOpen(true);
          }}
        >
          <ThumbUpIcon />
        </IconButton>
      );
    }
  };

  const CompanyCell: React.FunctionComponent<CompanyCellProps> = ({
    row,
    value,
  }: CompanyCellProps) => {
    return (
      <Link to={formatPath(VIEW_COMPANY, { companyId: row.companyId })}>
        {value}
      </Link>
    );
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70, hide: true },
    {
      field: "company",
      headerName: "Company",
      width: 220,
      disableClickEventBubbling: true,
      // eslint-disable-next-line react/display-name
      renderCell: (params: GridCellParams) => (
        <CompanyCell row={params.row} value={params.value} />
      ),
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
      width: 80,
      sortable: false,
      headerName: "Apply",
      // eslint-disable-next-line react/display-name
      renderCell: (params: GridCellParams) => <AddCell row={params.row} />,
      disableColumnMenu: true,
      disableClickEventBubbling: true,
    },
  ];

  return (
    <React.Fragment>
      <AddCandidate
        open={addCandidateOpen}
        onClose={() => setAddCandidateOpen(false)}
        taskId={taskIdToAdd}
        jobAddr={jobAddrToAdd}
        onUpdate={handleUpdate}
      />
      <Typography variant="h3" gutterBottom>
        Jobs
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

export default JobList;
