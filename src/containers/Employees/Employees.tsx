import {
  Button,
  Container,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { DataGrid, GridCellParams, GridColDef } from "@material-ui/data-grid";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import CreateEmployee from "./CreateEmployee/CreateEmployee";

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    paddingTop: "1em",
    paddingBottom: "1em",
  },
}));

const EditCell: React.FunctionComponent = () => {
  return (
    <IconButton onClick={() => console.log("delete")}>
      <CreateIcon />
    </IconButton>
  );
};

const DeleteCell: React.FunctionComponent = () => {
  return (
    <IconButton onClick={() => console.log("a")}>
      <DeleteIcon />
    </IconButton>
  );
};

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "fullName",
    headerName: "Full name",
    width: 200,
    disableClickEventBubbling: true,
  },
  {
    field: "salary",
    headerName: "Salary",
    width: 100,
    type: "number",
    disableClickEventBubbling: true,
  },
  {
    field: "salaryPeriod",
    headerName: "Salary Period",
    width: 150,
    disableClickEventBubbling: true,
  },
  {
    field: "employmentType",
    headerName: "Employment Type",
    width: 150,
    disableClickEventBubbling: true,
  },
  {
    field: "role",
    headerName: "Role",
    width: 200,
    disableClickEventBubbling: true,
  },
  {
    field: "startDate",
    headerName: "Start Date",
    width: 150,
    type: "date",
    disableClickEventBubbling: true,
  },
  {
    field: "address",
    headerName: "Address",
    width: 200,
    disableClickEventBubbling: true,
  },
  {
    field: "edit",
    width: 100,
    sortable: false,
    headerName: "Edit Salary",
    // eslint-disable-next-line react/display-name
    renderCell: (params: GridCellParams) => <EditCell />,
    disableColumnMenu: true,
    disableClickEventBubbling: true,
  },
  {
    field: "delete",
    width: 100,
    sortable: false,
    headerName: "Remove Employee",
    // eslint-disable-next-line react/display-name
    renderCell: (params: GridCellParams) => <DeleteCell />,
    disableColumnMenu: true,
    disableClickEventBubbling: true,
  },
];

const Employees: React.FunctionComponent = () => {
  const classes = useStyles();

  const [createEmployeeOpen, setCreateEmployeeOpen] = useState(false);

  const rows = [
    {
      id: 1,
      fullName: "Jon",
      salary: 100,
      salaryPeriod: "Monthly",
      employmentType: "Full-time",
      role: "Software Engineer",
      startDate: new Date(),
    },
  ];

  return (
    <React.Fragment>
      <CreateEmployee
        open={createEmployeeOpen}
        onClose={() => setCreateEmployeeOpen(false)}
      />
      <Typography variant="h3" gutterBottom>
        Employees
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
          onClick={() => setCreateEmployeeOpen(true)}
        >
          New Employee
        </Button>
      </Container>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid rows={rows} columns={columns} pageSize={5} />
      </div>
    </React.Fragment>
  );
};

export default Employees;
