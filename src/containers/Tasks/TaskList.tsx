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
import PublishIcon from "@material-ui/icons/Publish";
import SubmitTask from "./SubmitTask/SubmitTask";
import EtherContext from "../../contexts/EtherContext";
import UserContext from "../../contexts/UserContext";
import { BigNumber } from "@ethersproject/bignumber";
import { flatten } from "lodash";
import { Job__factory } from "@payrollah/payrollah-registry";

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
  const [jobAddrToSubmit, setJobAddrToSubmit] = useState("");

  const [rows, setRows] = useState<GridRowModel[]>([]);
  const [loading, setLoading] = useState(false);

  const [count, setCount] = useState(0);

  const handleUpdate = () => setCount(count + 1);

  const {
    jobCreatorContract,
    taskContract,
    companyContract,
    signer,
  } = useContext(EtherContext);

  const { address } = useContext(UserContext);

  const getTaskList = useCallback(() => {
    setLoading(true);
    if (
      jobCreatorContract &&
      taskContract &&
      signer &&
      companyContract &&
      address.length > 0
    ) {
      taskContract
        .getTaskByWorkerAddress(address)
        .then(async (taskIds: BigNumber[]) => {
          setRows(
            flatten(
              await Promise.all(
                taskIds.map(async (taskId) => {
                  const task = await taskContract.tasks(taskId);
                  const jobAddr = await taskContract.ownerOf(taskId);
                  const jobContract = Job__factory.connect(
                    jobAddr.toString(),
                    signer
                  );
                  return {
                    id: taskId.toNumber(),
                    jobAddr: jobAddr,
                    jobTitle: await jobContract.title(),
                    jobDescription: await jobContract.description(),
                    company: (
                      await jobContract
                        .jobOwner()
                        .then((ownerAddr) =>
                          companyContract.getCompanyIdByAddress(ownerAddr)
                        )
                        .then((companyId) =>
                          companyContract.companies(companyId)
                        )
                    ).name,
                    taskId: taskId.toNumber(),
                    taskTitle: task.title,
                    taskDescription: task.description,
                    compensation: task.compensation,
                    evidenceSubmitted: task.evidence.length > 0,
                  };
                })
              )
            )
          );
          setLoading(false);
        });
    }
  }, [jobCreatorContract, signer, taskContract, address, companyContract]);

  useEffect(() => {
    getTaskList();
  }, [getTaskList, count]);

  const SubmitCell: React.FunctionComponent<SubmitCellProps> = ({
    row,
  }: SubmitCellProps) => {
    console.log(row.evidenceSubmitted);
    return row.evidenceSubmitted ? (
      <div>Submitted</div>
    ) : (
      <IconButton
        onClick={() => {
          setTaskIdToSubmit(Number(row.id));
          setJobAddrToSubmit(row.jobAddr);
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
      width: 90,
      sortable: false,
      headerName: "Submit",
      // eslint-disable-next-line react/display-name
      renderCell: (params: GridCellParams) => <SubmitCell row={params.row} />,
      disableColumnMenu: true,
      disableClickEventBubbling: true,
    },
  ];

  return (
    <React.Fragment>
      <SubmitTask
        open={submitTaskOpen}
        onClose={() => setSubmitTaskOpen(false)}
        taskId={taskIdToSubmit}
        jobAddr={jobAddrToSubmit}
        onUpdate={handleUpdate}
      />
      <Typography variant="h3" gutterBottom>
        Your Tasks
      </Typography>
      <div
        style={{
          height: 750,
          width: "100%",
          textAlign: "center",
        }}
      >
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

export default TaskList;
