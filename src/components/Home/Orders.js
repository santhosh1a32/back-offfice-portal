import * as React from 'react';
import Link from '@mui/material/Link';
import Title from '../common/Title';
import { useNavigate } from "react-router-dom";
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Radio, RadioGroup, FormControlLabel, TableSortLabel } from '@mui/material';
import Box from '@mui/material/Box';
import { visuallyHidden } from '@mui/utils';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const columns = [
  { field: "contractNumber", label: "Subscription Number"},
  { field: "fullName", label: "Customer Name"},
  { field: "email", label: "Customer Email"},
  { field: "customerNumber", label: "Customer Number"},
  { field: "startDate", label: "Start Date"},
  { field: "status", label: "Status"},
  { field: "subStatus", label: "Sub Status"},
  { field: "createdDate", label: "Created Date"}
]
function preventDefault(event) {
  event.preventDefault();
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
      return -1;
  }
  if (b[orderBy] > a[orderBy]) {
      return 1;
  }
  return 0;
} 

function stableSort(array,order,orderBy,comparator) {
  if(array.length>0){
  let filteredArray = array.filter((item) => item[orderBy] == null)
  let tosort = array.filter((item) => item[orderBy])
  const stabilizedThis = tosort.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  let filteredItems = order === 'desc'?stabilizedThis.map((el) => el[0]).concat(filteredArray):filteredArray.concat(stabilizedThis.map((el) => el[0]));
  // console.log(filteredItems);
  return filteredItems;
  }
}


export default function Orders({allContractDetails}) {
  const [allContracts, setAllContracts] = React.useState({});
  const [filteredContracts, setFilteredContracts] = React.useState({});
  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('createdDate');
  const [searched, setSearched] = React.useState("");

  let navigate = useNavigate();

  const onClickHandle = (contractId) => {
    // console.log(contractId);
    navigate('/details?contractId='+contractId);
  }

  const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
      // console.log(order,orderBy);
    };
  const createSortHandler = (property) => (event) => {
      handleRequestSort(event, property);
  };

  const visibleRows = React.useMemo(
      () =>
        stableSort(filteredContracts,order,orderBy, getComparator(order, orderBy)),
      [order, orderBy,filteredContracts]
    );

  const requestSearch = (e) => {
      setSearched(e.target.value);
      let filteredRows = allContracts.filter((row) => {
          return row.fullName.toLowerCase().includes(e.target.value.toLowerCase()) || 
          // row.subStatus.toLowerCase().includes(e.target.value.toLowerCase()) || 
          // row.status.toLowerCase().includes(e.target.value.toLowerCase()) ||
          row.createdDate.toLowerCase().includes(e.target.value.toLowerCase()) ||
          row.email.toLowerCase().includes(e.target.value.toLowerCase())        
      });
      // console.log(filteredRows);
      setFilteredContracts(filteredRows);
  };

React.useEffect(() => {
  if (window['BackOfficePortalCtrl']) {
      setAllContracts(allContractDetails);
      setFilteredContracts(allContractDetails);
  }
},[allContractDetails])
  
  return (
    <React.Fragment>
      <div className='contract-search'><TextField id="standard-basic-search"  InputProps={{ startAdornment: ( <InputAdornment position="start"> <SearchIcon /> </InputAdornment> ), }} variant="standard" 
             placeholder="Search Customer or Contract" value={searched} onChange={requestSearch}/></div>
      <Title className="contracts-title">Contracts</Title>
      <Table size="small" className="bck-office-table">
        <TableHead>
        <TableRow>
            {columns.map((headCell) => (
              <TableCell 
              key={headCell.field}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.field ? order : false}
          >
              <TableSortLabel
              active={orderBy === headCell.field}
              direction={orderBy === headCell.field ? order : 'asc'}
              onClick={createSortHandler(headCell.field)}
              >
              {headCell.label}
              {orderBy === headCell.field ? (
                  <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
              ) : null}
              </TableSortLabel>
          </TableCell>
            ))}
        </TableRow>
        </TableHead>
        <TableBody>
          {visibleRows && visibleRows.map((row) => (
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
    </React.Fragment>
  );
}
