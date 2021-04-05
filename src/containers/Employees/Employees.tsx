import {
  Button,
  Container,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridRowModel,
} from "@material-ui/data-grid";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import CreateEmployee from "./CreateEmployee/CreateEmployee";
import EditEmployeeSalary from "./EditEmployeeSalary/EditEmployeeSalary";
import {
  BIWEEKLY,
  FULL_TIME,
  MONTHLY,
  PART_TIME,
} from "../../constants/salary";
import RemoveEmployee from "./RemoveEmployee/RemoveEmployee";
import EtherContext from "../../contexts/EtherContext";
import { BigNumber } from "@ethersproject/bignumber";

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    paddingTop: "1em",
    paddingBottom: "1em",
  },
}));

interface EditCellProps {
  row: GridRowModel;
}

interface DeleteCellProps {
  row: GridRowModel;
}

const Employees: React.FunctionComponent = () => {
  const classes = useStyles();
  const { companyContract } = useContext(EtherContext);

  useEffect(() => {
    companyContract
      ?.numCompanies()
      .then((value: BigNumber) => console.log(value.toNumber()));
  }, []);

  const [createEmployeeOpen, setCreateEmployeeOpen] = useState(false);
  const [editEmployeeOpen, setEditEmployeeOpen] = useState(false);
  const [removeEmployeeOpen, setRemoveEmployeeOpen] = useState(false);
  const [salaryAmountToEdit, setSalaryAmountToEdit] = useState(0);
  const [salaryPeriodToEdit, setSalaryPeriodToEdit] = useState("");
  const [employeeAddressToEdit, setEmployeeAddressToEdit] = useState("");
  const [employeeAddressToRemove, setEmployeeAddressToRemove] = useState("");

  const EditCell: React.FunctionComponent<EditCellProps> = ({
    row,
  }: EditCellProps) => {
    return (
      <IconButton
        onClick={() => {
          setSalaryAmountToEdit(row.salary);
          setSalaryPeriodToEdit(row.salaryPeriod);
          setEmployeeAddressToEdit(row.address);
          setEditEmployeeOpen(true);
        }}
      >
        <CreateIcon />
      </IconButton>
    );
  };

  const DeleteCell: React.FunctionComponent<DeleteCellProps> = ({
    row,
  }: DeleteCellProps) => {
    return (
      <IconButton
        onClick={() => {
          setEmployeeAddressToRemove(row.address);
          setRemoveEmployeeOpen(true);
        }}
      >
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
      renderCell: (params: GridCellParams) => <EditCell row={params.row} />,
      disableColumnMenu: true,
      disableClickEventBubbling: true,
    },
    {
      field: "delete",
      width: 100,
      sortable: false,
      headerName: "Remove Employee",
      // eslint-disable-next-line react/display-name
      renderCell: (params: GridCellParams) => <DeleteCell row={params.row} />,
      disableColumnMenu: true,
      disableClickEventBubbling: true,
    },
  ];

  const rows = [
    {
      id: 1,
      fullName: "Jon",
      salary: 100,
      salaryPeriod: MONTHLY,
      employmentType: FULL_TIME,
      role: "Software Engineer",
      startDate: new Date(),
      address: "0xfasdfas",
    },
    {
      id: 2,
      fullName: "Jon",
      salary: 230,
      salaryPeriod: BIWEEKLY,
      employmentType: PART_TIME,
      role: "Software Engineer",
      startDate: new Date(),
      address: "0xfasjkjkj",
    },
  ];

  return (
    <React.Fragment>
      <CreateEmployee
        open={createEmployeeOpen}
        onClose={() => setCreateEmployeeOpen(false)}
      />
      <EditEmployeeSalary
        open={editEmployeeOpen}
        currSalaryAmount={salaryAmountToEdit}
        currSalaryPeriod={salaryPeriodToEdit}
        onClose={() => setEditEmployeeOpen(false)}
        employeeAddress={employeeAddressToEdit}
      />
      <RemoveEmployee
        open={removeEmployeeOpen}
        onClose={() => setRemoveEmployeeOpen(false)}
        employeeAddress={employeeAddressToRemove}
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
