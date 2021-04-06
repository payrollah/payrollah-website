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
import MessageIcon from "@material-ui/icons/Message";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ViewClaimMessage from "../Claims/ViewClaimMessage/ViewClaimMessage";
import AcceptClaim from "./AcceptClaim/AcceptClaim";
import RejectClaim from "./RejectClaim/RejectClaim";

// const useStyles = makeStyles((theme) => ({
//   buttonContainer: {
//     display: "flex",
//     justifyContent: "flex-end",
//     paddingTop: "1em",
//     paddingBottom: "1em",
//   },
// }));

interface ViewCellProps {
  row: GridRowModel;
}

interface AcceptCellProps {
  row: GridRowModel;
}

interface RejectCellProps {
  row: GridRowModel;
}

// const currencyFormatter = new Intl.NumberFormat("en-US", {
//   style: "currency",
//   currency: "USD",
// });

const CompanyClaims: React.FunctionComponent = () => {
  // const classes = useStyles();

  const [viewClaimMessageOpen, setViewClaimMessageOpen] = useState(false);
  const [messageToClaimView, setMessageToClaimView] = useState("");
  const [messageToRejectView, setMessageToRejectView] = useState("");

  const [acceptClaimOpen, setAcceptClaimOpen] = useState(false);
  const [claimIdToAccept, setClaimIdToAccept] = useState(0);

  const [rejectClaimOpen, setRejectClaimOpen] = useState(false);
  const [claimIdToReject, setClaimIdToReject] = useState(0);

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

  const AcceptCell: React.FunctionComponent<AcceptCellProps> = ({
    row,
  }: AcceptCellProps) => {
    return (
      <IconButton
        onClick={() => {
          setClaimIdToAccept(row.message);
          setAcceptClaimOpen(true);
        }}
      >
        <ThumbUpIcon />
      </IconButton>
    );
  };

  const RejectCell: React.FunctionComponent<RejectCellProps> = ({
    row,
  }: RejectCellProps) => {
    return (
      <IconButton
        onClick={() => {
          setClaimIdToReject(row.message);
          setRejectClaimOpen(true);
        }}
      >
        <ThumbDownIcon />
      </IconButton>
    );
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "date",
      headerName: "Date",
      width: 100,
      type: "date",
      disableClickEventBubbling: true,
    },
    {
      field: "employee",
      headerName: "Employee",
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
      field: "accept",
      width: 80,
      sortable: false,
      headerName: "Accept",
      // eslint-disable-next-line react/display-name
      renderCell: (params: GridCellParams) => <AcceptCell row={params.row} />,
      disableColumnMenu: true,
      disableClickEventBubbling: true,
    },
    {
      field: "reject",
      width: 80,
      sortable: false,
      headerName: "Reject",
      // eslint-disable-next-line react/display-name
      renderCell: (params: GridCellParams) => <RejectCell row={params.row} />,
      disableColumnMenu: true,
      disableClickEventBubbling: true,
    },
  ];

  const rows = [
    {
      id: 1,
      date: new Date(),
      employee: "John Doe",
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
      employee: "Jane Doe",
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
      employee: "John Doe",
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
      <ViewClaimMessage
        open={viewClaimMessageOpen}
        messageToClaim={messageToClaimView}
        messageToReject={messageToRejectView}
        onClose={() => setViewClaimMessageOpen(false)}
      />
      <AcceptClaim
        open={acceptClaimOpen}
        onClose={() => setAcceptClaimOpen(false)}
        claimId={claimIdToAccept}
      />
      <RejectClaim
        open={rejectClaimOpen}
        onClose={() => setRejectClaimOpen(false)}
        claimId={claimIdToReject}
      />
      <Typography variant="h3" gutterBottom>
        Claims
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

export default CompanyClaims;
