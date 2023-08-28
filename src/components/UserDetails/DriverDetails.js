import React, {useState} from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
//import TablePagination from '@mui/material/TablePagination';
import TableRow from "@mui/material/TableRow";
import SectionWithTitle from "../common/SectionWithTitle";
import './DriverDetails.scss';
import { DRIVER_DETAILS } from './driverMockData';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

/**<Chip
        color="success"
        label={
          <span>
            <b>Status:</b> Completed
          </span>
        }
        icon={<Check fontSize="small" />} */

const columns = [
  { id: "firstName", label: "First Name", minWidth: 150 },
  { id: "lastName", label: "Last Name", minWidth: 150 },
  { id: "type", label: "Type", minWidth: 70 },
  {
    id: "startDate",
    label: "Start Date",
    minWidth: 170,
    align: "right",
    // format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "endDate",
    label: "End Date",
    minWidth: 170,
    align: "right",
    format: (value) => {
      new Date(value).toLocaleDateString();
      console.log(new Date(value).toLocaleDateString());
    },
  },
  {
    id: "licenseCheck",
    label: "License Check",
    minWidth: 170,
    align: "right",
  },
  {
    id: "status",
    label: "Status",
    minWidth: 170,
    align: "center",
    // format: (value) => value.toFixed(2),
  },
];

export default function DriverDetails() {
  const [driverDetails, setDriverDetails] = useState(DRIVER_DETAILS);

  // useEffect(() => {
  //   var obj = { contractId: searchParams.get("contractId") };
  //   if (window["BackOfficePortalCtrl"]) {
  //     getDataWithParam(
  //       "BackOfficePortalCtrl",
  //       "getContractDetails",
  //       JSON.stringify(obj)
  //     ).then((result) => {
  //       console.log(result);
  //       setDriverDetails(result);
  //     });
  //   }
  // }, [searchParams]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} className="section">
        <SectionWithTitle title={"Driver Details"}></SectionWithTitle>
        <Paper sx={{ width: "100%", overflow: "hidden", marginTop: "10px" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{
                        minWidth: column.minWidth,
                        fontSize: 14,
                        fontWeight: 600,
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {driverDetails.driverDetails.map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.driverId}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            className={column.status}
                            key={column.id}
                            align={column.align}
                          >
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </Grid>
  );
}
