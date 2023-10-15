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
const columns = [
  { field: "fullName", label: "Customer Name"},
  { field: "email", label: "Customer Email"},
  { field: "contractNumber", label: "Contract Number"},
  { field: "contractType", label: "Contract Type"},
  { field: "startDate", label: "Start Date"},
  { field: "endDate", label: "End Date"},
  { field: "status", label: "Status"},
  { field: "subStatus", label: "Sub Status"},
  { field: "createdDate", label: "Contract Created Date"}
]
function preventDefault(event) {
  event.preventDefault();
}

export default function Orders({allContractDetails}) {
  let navigate = useNavigate();

  const onClickHandle = (contractId) => {
    console.log(contractId);
    navigate('/details?contractId='+contractId);
  }
  
  return (
    <React.Fragment>
      <Title>Contracts</Title>
      <Table size="small" className="bck-office-table">
        <TableHead>
        <TableRow>
            {columns.map((column) => (
              <TableCell sx={{whiteSpace:'nowrap'}}
                key={column.field}
              >
                {column.label}
              </TableCell>
            ))}
        </TableRow>
        </TableHead>
        <TableBody>
          {allContractDetails.map((row) => (
            <TableRow key={row.contractId} onClick={() => onClickHandle(row.contractId)} style={{cursor: 'pointer'}}>
              {columns.map(column => (
                          <TableCell key={column.field}>
                            {row[column.field]}
                          </TableCell>
                      ))}
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
