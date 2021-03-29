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
} from "@material-ui/data-grid";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import CreateClaim from "./CreateClaim/CreateClaim";
import ViewClaim from "./ViewClaim";

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    paddingTop: "1em",
    paddingBottom: "1em",
  },
}));

const DeleteCell: React.FunctionComponent = () => {
  return (
    <IconButton onClick={() => console.log("a")}>
      <DeleteIcon />
    </IconButton>
  );
};

const ViewCell: React.FunctionComponent = () => {
  return (
    <IconButton onClick={() => console.log("view")}>
      <MoreHorizIcon />
    </IconButton>
  );
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

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
    headerName: "Amount ($)",
    width: 125,
    type: "number",
    valueFormatter: ({ value }) => currencyFormatter.format(Number(value)),
    cellClassName: "font-tabular-nums",
    disableClickEventBubbling: true,
  },
  {
    field: "status",
    headerName: "Status",
    width: 100,
    disableClickEventBubbling: true,
  },
  {
    field: "view",
    width: 80,
    sortable: false,
    headerName: "View",
    // eslint-disable-next-line react/display-name
    renderCell: (params: GridCellParams) => <ViewCell />,
    disableColumnMenu: true,
    disableClickEventBubbling: true,
  },
  {
    field: "delete",
    width: 80,
    sortable: false,
    headerName: "Delete",
    // eslint-disable-next-line react/display-name
    renderCell: (params: GridCellParams) => <DeleteCell />,
    disableColumnMenu: true,
    disableClickEventBubbling: true,
  },
];

const Claims: React.FunctionComponent = () => {
  const classes = useStyles();

  const [createClaimOpen, setCreateClaimOpen] = useState(false);
  const [viewClaimOpen, setViewClaimOpen] = useState(false);

  const rows = [
    {
      id: 1,
      date: new Date(),
      company: "ABC Company",
      timesheet: 100,
      salaryAmount: 2000,
      claimType: "Part-Time",
      status: "Pending",
      messageToAccept: "message to accept",
    },
    {
      id: 2,
      date: new Date(),
      company: "ABC Company",
      timesheet: 30,
      salaryAmount: 600,
      claimType: "Loan",
      status: "Cancelled",
      messageToAccept: "message to accept",
    },
    {
      id: 3,
      date: new Date(),
      company: "ABC Company",
      timesheet: 50,
      salaryAmount: 1000,
      claimType: "Loan",
      status: "Accepted",
      messageToAccept: "message to accept",
    },
  ];

  return (
    <React.Fragment>
      <CreateClaim
        open={createClaimOpen}
        onClose={() => setCreateClaimOpen(false)}
      />
      <ViewClaim open={viewClaimOpen} onClose={() => setViewClaimOpen(false)} />
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
          endIcon={<PersonAddIcon />}
          onClick={() => setCreateClaimOpen(true)}
        >
          New Claim
        </Button>
        <Button
          variant="contained"
          color="primary"
          endIcon={<PersonAddIcon />}
          onClick={() => setViewClaimOpen(true)}
        >
          View Claim
        </Button>
      </Container>
      <div style={{ height: 400, width: "100%" }}>
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
