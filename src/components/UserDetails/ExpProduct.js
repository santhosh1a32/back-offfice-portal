import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../common/Title';

// Generate Order Data
// function createData(id, name, ep_type, start_date, end_date) {
//   return { id, name, ep_type, start_date, end_date };
// }

// const rows = [
//   createData(
//     'EP-43',
//     'Platform Fee',
//     'Free',
//     '01/07/2023',
//     '31/07/2023'
//   ),
//   createData(
//     'EP-56',
//     'Fuel Card',
//     'Add On',
//     '01/07/2023',
//     '31/07/2023'
//   ),
//   createData(
//     'EP-78',
//     'GPS',
//     'Add On',
//     '01/07/2023',
//     '31/07/2023'
//   ),
//   createData(
//     'EP-91',
//     'Fuel Card',
//     'Add On',
//     '01/07/2023',
//     '31/07/2023'
//   ),
// ];

export default function ExpProduct({expDetails= []}) {
  return (
    <React.Fragment>
      <Title>Experience Product</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>EP Id</TableCell>
            <TableCell>EP Name</TableCell>
            <TableCell>EP type</TableCell>
            <TableCell>Gross Amount</TableCell>
            <TableCell>Net Amount</TableCell>
            <TableCell>Tax</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expDetails.map((row) => (
            <TableRow key={row.contractVersionEPId}>
              <TableCell>{row.contractVersionEPId}</TableCell>
              <TableCell>{row.experienceProductName}</TableCell>
              <TableCell>{row.experienceProductType}</TableCell>
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
