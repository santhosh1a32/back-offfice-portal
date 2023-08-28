import React, {useState} from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import SectionWithTitle from "../common/SectionWithTitle";
import "./DriverDetails.scss";
import { CONTRACT_DETAILS } from "./mockData";


const columns = [
  { field: "invoiceNumber", label: "Invoice Number", minWidth: 170 },
  { field: "invoiceDate", label: "Invoice Date", minWidth: 100 },
  {
    field: "billingReason",
    label: "Billing Reason",
    minWidth: 100,
  },
  {
    field: "amountPaid",
    label: "Amount",
    minWidth: 100,
    format: (params) => `${params.amountPaid} ${params.currency}`,
  },
  {
    field: "collectionMethod",
    label: "Collection Method",
    minWidth: 100,
  },
];

export default function OtherPaymentsDetails(){
    const [otherPaymentsDetails, setPaymentsDetails] = useState(CONTRACT_DETAILS);
   
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} className="section">
          <SectionWithTitle title={"Other Payment Details"}></SectionWithTitle>
          <Paper sx={{ width: "100%", overflow: "hidden", marginTop: "10px" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.field}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {otherPaymentsDetails.otherPayments.map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        {columns.map((column) => {
                          const value = row[column.field];
                          return (
                            <TableCell key={column.field} align={column.align}>
                              {column.format ? column.format(row) : value}
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