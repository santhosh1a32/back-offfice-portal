import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../common/Title';

export default function Plan({planDetails=[]}) {
  return (
    <React.Fragment>
      <Title>Plan Details</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Plan Id</TableCell>
            <TableCell>Plan Name</TableCell>
            <TableCell>Insurance</TableCell>
            <TableCell>Mileage Included</TableCell>
            <TableCell>Gross Amount</TableCell>
            <TableCell>Net Amount</TableCell>
            <TableCell>Tax</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {planDetails.map((row) => (
            <TableRow key={row.contractVersionPlanId}>
              <TableCell>{row.contractVersionPlanNumber}</TableCell>
              <TableCell>{row.planName}</TableCell>
              <TableCell>{row.insuranceExcess}</TableCell>
              <TableCell>{row.includedMileage}</TableCell>
              <TableCell>{row.grossAmount}</TableCell>
              <TableCell>{row.netAmount}</TableCell>
              <TableCell>{row.taxAmount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link> */}
    </React.Fragment>
  );
}
