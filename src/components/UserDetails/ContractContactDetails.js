import * as React from 'react';
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
import SectionWithTitle from "../common/SectionWithTitle";

const columns = [
    { field: "contactContractId", label: "Contract Id", minWidth: 170 },
    { field: "contactBillingAddress", label: "Billing Address", minWidth: 170 },
    { field: "contactHomeAddress", label: "Home Address", minWidth: 100 },
    { field: "contactMobile", label: "Mobile", minWidth: 100 },
    { field: "contactValidFrom", label: "Valid From", minWidth: 100 },
    { field: "contactValidTo", label: "Valid To", minWidth: 100 },
    { field: "contactVerificationStatus", label: "Status", minWidth: 100 }
]

const ContractContactDetails = ({contractContactDetails}) => {
    return (
        <Grid container spacing={3}>
        <Grid item xs={12} className="section">
          <SectionWithTitle title={"Contract Contacts"}></SectionWithTitle>
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
                  </TableRow>
                </TableHead>
                <TableBody>
                  {contractContactDetails.map((row) => {
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
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    )

}

export default ContractContactDetails;