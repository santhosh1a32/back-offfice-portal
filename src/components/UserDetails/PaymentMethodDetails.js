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
import SectionWithTitle from "../common/SectionWithTitle";
import Title from '../common/Title';

const columns = [
  { field: "paymentLast4Digits", label: "Card 4 Digits", minWidth: 170 },
  { field: "paymentNameOnCard", label: "Verified Name", minWidth: 100 },
  { field: "paymentCardType", label: "Card Type", minWidth: 100 },
  { field: "paymentCardIssuer", label: "Card Issuer", minWidth: 100 },
  { field: "paymentExpiryMonth", label: "Expiry Month", minWidth: 100 },
//   { field: "endFuelLevel", label: "End Fuel Level", minWidth: 100 }
];

const paymentMethods = [{
    "paymentId":"",
    "paymentLast4Digits":"",
    "paymentCardType":"",
    "paymentCardIssuer":"",
    "paymentExpiryMonth":"",
    "paymentExpiryYear":""
}]


export default function PaymentMethodDetails({paymentMethods}) {
  return ( 
    <Grid container spacing={3}>
    <Grid item xs={12} className="section">
        <SectionWithTitle title={"Payment Methods"}></SectionWithTitle>
        <Paper sx={{ width: "100%", overflow: "hidden", marginTop: "10px" }}>
      <Table size="small" className='bck-office-table'>
        <TableHead>
          <TableRow>
            <TableCell>Card 4 Digits</TableCell>
            <TableCell>Verified Name</TableCell>
            <TableCell>Card Type</TableCell>
            <TableCell>Card Issuer</TableCell>
            <TableCell>Expiry Month</TableCell>
            <TableCell>Expiry Year</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paymentMethods && paymentMethods.map((row) => (
            <TableRow key={row.paymentId}>
              <TableCell>{row.paymentLast4Digits}</TableCell>
              <TableCell>{row.paymentNameOnCard}</TableCell>
              <TableCell>{row.paymentCardType}</TableCell>
              <TableCell>{row.paymentCardIssuer}</TableCell>
              <TableCell>{row.paymentExpiryMonth}</TableCell>
              <TableCell>{row.paymentExpiryYear}</TableCell>             
            </TableRow>
          ))
        }
        </TableBody>
      </Table>
      </Paper>
      </Grid>
      </Grid>
  );
}
