import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
// import TablePagination from "@mui/material/TablePagination";
import SectionWithTitle from "../common/SectionWithTitle";
import "./DriverDetails.scss";


const columns = [
  { field: "invoiceNumber", label: "Invoice Number", minWidth: 170 },
  { field: "invoiceStartDate", label: "Period Start Date", minWidth: 100 },
  { field: "invoiceEndDate", label: "Period End Date", minWidth: 100 },
  { field: "invoicePaid", label: "Amount", minWidth: 100 },
  { field: "invoiceStatus", label: "Invoice Status", minWidth: 100 },
  { field: "linkedPaymentMethod", label: "Linked Payment Method", minWidth: 100 },
  
  // {
  //   field: "billingPeriod",
  //   label: "Billing Period",
  //   minWidth: 150,
  //   align: "right",
  //   format: (params) =>
  //     `(${new Date(params.periodStartDate).toLocaleDateString()} - ${new Date(
  //       params.periodEndDate
  //     ).toLocaleDateString()})`,
  // },
  // {
  //   field: "amountPaid",
  //   label: "Amount",
  //   minWidth: 150,
  //   align: "right",
  //   format: (params) => `${params.amountPaid} ${params.currency}`,
  // },
  // {
  //   field: "status",
  //   label: "Status",
  //   minWidth: 150,
  //   align: "right",
  // },
  // {
  //   field: "last4CardNumber",
  //   label: "Card Detail",
  //   minWidth: 150,
  //   align: "right",
  //   format: (params) =>
  //     `Card ending in ${params.paymentDetails.last4CardNumber}`,
  // },
  // {
  //   field: "invoiceUrl",
  //   label: "",
  //   minWidth: 150,
  //   align: "right",
  //   format: (params) => (
  //     <a href={params.invoiceUrl} download="PDF-document" target="_blank" rel="noopener noreferrer" >
       
  //       <Button variant="outlined"> <DownloadIcon/>Invoice PDF</Button>
  //     </a>  
  //   ),
  // },
];

export default function InvoiceDetails({ invoiceDetails }) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} className="section">
        <SectionWithTitle title={"Invoice Details"}></SectionWithTitle>
        <Paper sx={{ width: "100%", overflow: "hidden", marginTop: "10px" }}>
          <TableContainer sx={{ maxHeight: 300 }} className="bck-office-table">
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.field}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                  <TableCell>
                      Action
                    </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoiceDetails.map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.field];
                        return (
                          <TableCell key={column.field} align={column.align}>
                            {column.format ? column.format(row) : value}
                          </TableCell>
                          // {column.type?(<TableCell>Downlaod</TableCell>):(<TableCell key={column.field} align={column.align}>{column.format ? column.format(row) : value}</TableCell>)}
                        );
                      })}
                      <TableCell>View</TableCell>
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
