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
import DeleteIcon from "@material-ui/icons/Delete";
import MessageIcon from "@material-ui/icons/Message";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import CreateClaim from "./CreateClaim/CreateClaim";
import CancelClaim from "./CancelClaim/CancelClaim";
import ViewClaimMessage from "./ViewClaimMessage/ViewClaimMessage";

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

interface DeleteCellProps {
  row: GridRowModel;
}

// const currencyFormatter = new Intl.NumberFormat("en-US", {
//   style: "currency",
//   currency: "USD",
// });

const Claims: React.FunctionComponent = () => {
  const classes = useStyles();

  const [createClaimOpen, setCreateClaimOpen] = useState(false);

  const [viewClaimMessageOpen, setViewClaimMessageOpen] = useState(false);
  const [messageToClaimView, setMessageToClaimView] = useState("");
  const [messageToRejectView, setMessageToRejectView] = useState("");

  const [cancelClaimOpen, setCancelClaimOpen] = useState(false);
  const [claimIdToCancel, setClaimIdToCancel] = useState(0);

  const ViewCell: React.FunctionComponent<ViewCellProps> = ({
    row,
  }: ViewCellProps) => {
    return (
      <IconButton
        onClick={() => {
          if (row.messageToClaim) {
            setMessageToClaimView(row.messageToClaim);
          } else {
            setMessageToClaimView("-");
          }
          if (row.messageToReject) {
            setMessageToRejectView(row.messageToReject);
          } else {
            setMessageToRejectView("-");
          }
          setViewClaimMessageOpen(true);
        }}
      >
        <MessageIcon />
      </IconButton>
    );
  };

  const DeleteCell: React.FunctionComponent<DeleteCellProps> = ({
    row,
  }: DeleteCellProps) => {
    return (
      <IconButton
        onClick={() => {
          setClaimIdToCancel(row.message);
          setCancelClaimOpen(true);
        }}
      >
        <DeleteIcon />
      </IconButton>
    );
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "date",
      headerName: "Date",
      width: 125,
      type: "date",
      disableClickEventBubbling: true,
    },
    {
      field: "company",
      headerName: "Company",
      width: 150,
      disableClickEventBubbling: true,
    },
    {
      field: "claimType",
      headerName: "Type",
      width: 100,
      disableClickEventBubbling: true,
    },
    {
      field: "timesheet",
      headerName: "Time Units",
      width: 125,
      type: "number",
      disableClickEventBubbling: true,
    },
    {
      field: "salaryAmount",
      headerName: "Amount",
      width: 125,
      type: "number",
      //  valueFormatter: ({ value }) => currencyFormatter.format(Number(value)),
      //  cellClassName: "font-tabular-nums",
      disableClickEventBubbling: true,
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      disableClickEventBubbling: true,
    },
    {
      field: "messageToClaim",
      headerName: "Claim Message",
      width: 100,
      hide: true,
      disableClickEventBubbling: true,
    },
    {
      field: "messageToReject",
      headerName: "Rejection Message",
      width: 100,
      hide: true,
      disableClickEventBubbling: true,
    },
    {
      field: "message",
      width: 100,
      sortable: false,
      headerName: "Message",
      // eslint-disable-next-line react/display-name
      renderCell: (params: GridCellParams) => <ViewCell row={params.row} />,
      disableColumnMenu: true,
      disableClickEventBubbling: true,
    },
    {
      field: "delete",
      width: 80,
      sortable: false,
      headerName: "Cancel",
      // eslint-disable-next-line react/display-name
      renderCell: (params: GridCellParams) => <DeleteCell row={params.row} />,
      disableColumnMenu: true,
      disableClickEventBubbling: true,
    },
  ];

  const rows = [
    {
      id: 1,
      date: new Date(),
      company: "ABC Company",
      timesheet: 100,
      salaryAmount: 2000,
      claimType: "Part-Time",
      status: "Pending",
      messageToClaim: "I would like to get my pay in advance.",
      messageToReject: "",
      delete: "Pending",
    },
    {
      id: 2,
      date: new Date(),
      company: "ABC Company",
      timesheet: 30,
      salaryAmount: 600,
      claimType: "Loan",
      status: "Cancelled",
      messageToClaim: "I would like to get my pay in advance.",
      messageToReject: "",
    },
    {
      id: 3,
      date: new Date(),
      company: "ABC Company",
      timesheet: 50,
      salaryAmount: 1000,
      claimType: "Loan",
      status: "Accepted",
      messageToClaim: "",
      messageToReject: "",
    },
  ];

  return (
    <React.Fragment>
      <CreateClaim
        open={createClaimOpen}
        onClose={() => setCreateClaimOpen(false)}
      />
      <ViewClaimMessage
        open={viewClaimMessageOpen}
        messageToClaim={messageToClaimView}
        messageToReject={messageToRejectView}
        onClose={() => setViewClaimMessageOpen(false)}
      />
      <CancelClaim
        open={cancelClaimOpen}
        onClose={() => setCancelClaimOpen(false)}
        claimId={claimIdToCancel}
      />
      <Typography variant="h3" gutterBottom>
        Claims
      </Typography>
      <Container
        disableGutters
        maxWidth={false}
        className={classes.buttonContainer}
      >
        <Button
          variant="contained"
          color="primary"
          endIcon={<AssignmentIndIcon />}
          onClick={() => setCreateClaimOpen(true)}
        >
          New Claim
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

export default Claims;
