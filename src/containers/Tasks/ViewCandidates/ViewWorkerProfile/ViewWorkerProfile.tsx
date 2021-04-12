import {
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  // DialogContentText,
  // DialogTitle,
  Typography,
} from "@material-ui/core";
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridRowModel,
} from "@material-ui/data-grid";
import EtherContext from "../../../../contexts/EtherContext";
import { BigNumber } from "@ethersproject/bignumber";
import GetAppIcon from "@material-ui/icons/GetApp";
import { Task } from "@payrollah/payrollah-registry/dist/ts/contracts";

interface Props {
  open: boolean;
  onClose: () => void;
  workerIdToView: number;
  workerAddrToView: string;
}

interface LinkCellProps {
  row: GridRowModel;
}

const ViewWorkerProfile: React.FunctionComponent<Props> = ({
  open,
  onClose,
  workerIdToView,
  workerAddrToView,
}: Props) => {
  const { taskContract, signer } = useContext(EtherContext);

  const [rows, setRows] = useState<GridRowModel[]>([]);
  const [loading, setLoading] = useState(false);

  const getTaskData = async (taskId: BigNumber, contract: Task) => {
    const task = await contract.tasks(taskId);

    return {
      id: taskId.toNumber(),
      taskTitle: task.title,
      evidence: task.evidence,
      isComplete: task.isComplete,
    };
  };

  const getTaskList = useCallback(() => {
    setLoading(true);
    if (taskContract && signer && workerAddrToView) {
      // get list of worker past tasks
      const transferLogFilter = taskContract.filters.TaskApproved(
        null,
        workerAddrToView,
        null
      );
      try {
        taskContract
          .queryFilter(transferLogFilter, 0)
          .then(async (eventList) => {
            setRows(
              await Promise.all(
                eventList.map((event) => {
                  const taskId = event.args.taskId;
                  return getTaskData(taskId, taskContract);
                })
              )
            );
          });
        setLoading(false);
      } catch (e) {
        console.error(e);
      }
    }
    setLoading(false);
  }, [signer, taskContract, workerAddrToView]);

  useEffect(() => {
    getTaskList();
  }, [getTaskList]);

  const LinkCell: React.FunctionComponent<LinkCellProps> = ({
    row,
  }: LinkCellProps) => {
    if (!!row.evidence && row.isComplete) {
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
      return (
        <Typography variant="caption" gutterBottom>
          Unavailable
        </Typography>
      );
      // return <CloseIcon style={{ width: "100%" }} />;
    }
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "taskTitle",
      headerName: "Task Title",
      width: 330,
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
  ];

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent dividers>
        <Typography gutterBottom>Worker Id: {workerIdToView}</Typography>
        <Typography gutterBottom>Worker Address: {workerAddrToView}</Typography>
      </DialogContent>
      <DialogContent dividers>
        <div style={{ height: 400, width: "100%", textAlign: "center" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            loading={loading}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewWorkerProfile;
