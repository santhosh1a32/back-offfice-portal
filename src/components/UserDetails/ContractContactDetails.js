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
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import SectionWithTitle from "../common/SectionWithTitle";
import  AddressModal  from "../Checklist/AddressModal";

const columns = [
    // { field: "contactContractId", label: "Contract Id", minWidth: 50 },
    { field: "contactBillingAddress", label: "Billing Address", minWidth: 150 },
    { field: "billingAddressVerificationStatus", label: "Billing Address Status", minWidth: 100 },    
    { field: "contactHomeAddress", label: "Home Address", minWidth: 150 },
    { field: "homeAddressVerificationStatus", label: "Home Address Status", minWidth: 100 },   
    { field: "contactMobile", label: "Mobile", minWidth: 100 },
    { field: "mobileVerificationStatus", label: "Mobile Status", minWidth: 100 },    
    { field: "contactValidFrom", label: "Valid From", minWidth: 100 },
    { field: "contactValidTo", label: "Valid To", minWidth: 100 },
    // { field: "action", label: "Action", minWidth: 100 }
]

const ContractContactDetails = ({contractContactDetails}) => {
  const [openAddressDialog, setAddressDialog] = React.useState(false);

  const showAddressModal = () => {
    console.log("address modal");
    setAddressDialog(true);
}

  const closeAddressDialog = () => {
    setAddressDialog(false);
}

  const handleSubmit = () => {
    console.log("submit address modal");
  }

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
                    <TableCell>Action</TableCell>
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
                        <TableCell>
                          <span style={{color:'blue',cursor:'pointer'}} onClick={showAddressModal}>Update</span></TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            {openAddressDialog && 
            <AddressModal 
                open={openAddressDialog}
                handleClose={closeAddressDialog}
                contractContactDetails={contractContactDetails}
                onSubmit={handleSubmit}
            />}
          </Paper>
        </Grid>
      </Grid>
    )

}

export default ContractContactDetails;