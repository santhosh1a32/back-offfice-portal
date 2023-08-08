import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../common/Title';
import { useNavigate } from "react-router-dom";

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(
    0,
    '03 Aug, 2023',
    'John Cena',
    'Subscription',
    'Active',
    312.44,
  ),
  createData(
    1,
    '02 Aug, 2023',
    'Paul McCartney',
    'Subscription',
    'Paused',
    866.99,
  ),
  // createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
  // createData(
  //   3,
  //   '16 Mar, 2023',
  //   'Michael Jackson',
  //   'Gary, NL',
  //   'AMEX ⠀•••• 2000',
  //   654.39,
  // ),
  // createData(
  //   4,
  //   '15 Mar, 2023',
  //   'Bruce Springsteen',
  //   'Long Branch, US',
  //   'VISA ⠀•••• 5919',
  //   212.79,
  // ),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  let navigate = useNavigate();
  const onClickHandle = () => {
    navigate('/details?contractId=a1A5i000000rrcS');
  }
  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Customer Name</TableCell>
            <TableCell>Contract Type</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Sale Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id} onClick={onClickHandle} style={{cursor: 'pointer'}}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{`$${row.amount}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
}
