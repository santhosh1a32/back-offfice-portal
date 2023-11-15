import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../common/Title';


export default function Products({ bpDetails, title='Base Product' }) {
  
  const {
    contractVersionBPNumber='',
    productName,
    allocatedVehicle = [],
    priceAllocationType,
    grossAmount,
    netAmount,
    taxAmount
  } = bpDetails;
  const activeVehicle = allocatedVehicle.filter(item => {
    return item.status === 'Active'
  });
  const currentVehicle = activeVehicle && activeVehicle.length ? activeVehicle[0] : allocatedVehicle && allocatedVehicle.length ? allocatedVehicle[0] : [];


  return (
    <React.Fragment>
      <Title>{title}</Title>
      <Table size="small" className='bck-office-table'>
        <TableHead>
          <TableRow>
            <TableCell>Base Product Name</TableCell>
            <TableCell>Allocated Vehicle</TableCell>
            <TableCell>Gross Amount</TableCell>
            <TableCell>Net Amount</TableCell>
            <TableCell>Tax Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>{productName}</TableCell>
            <TableCell>{currentVehicle.vehicleId}</TableCell>
            <TableCell>{grossAmount}</TableCell>
            <TableCell>{netAmount}</TableCell>
            <TableCell>{taxAmount}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {/* <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link> */}
    </React.Fragment>
  );
}
