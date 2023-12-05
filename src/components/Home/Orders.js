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

export default function Orders({allContractDetails}) {
  const [allContracts, setAllContracts] = React.useState({});
  const [filteredContracts, setFilteredContracts] = React.useState();
  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('createdDate');
  const [searched, setSearched] = React.useState("");

  let navigate = useNavigate();

  const onClickHandle = (contractId) => {
    // console.log(contractId);
    navigate('/details?contractId='+contractId);
  }

  const convertDate = (date,sortField) => {
    let [day, month, year] = date.split('/');
    if(sortField==="startDate")
    year = year.split(',')[0];
    let dateObj = new Date(+year, +month - 1, +day);
    return dateObj;
  }

  const sortItems = (sortField) =>{
    let sortOrder = (orderBy === sortField && order === 'asc')?-1:1;
    setOrder(sortOrder == 1 ?'asc':'desc');
    setOrderBy(sortField);
    let filteredNullArray = filteredContracts.filter((item) => item[sortField] === undefined);
    let tosort = filteredContracts.filter((item) => item[sortField]);
    if(sortField === "startDate"){
      tosort.map((item) => convertDate(item[sortField],item))
    }
    tosort.sort((a,b)=>{
      if(a[sortField]>b[sortField])
        return 1*sortOrder;
      else if(a[sortField]<b[sortField])
        return -1*sortOrder;
      else
        return 0;
    })
    let filteredItems = tosort.concat(filteredNullArray)
    setFilteredContracts(filteredItems);
  }

  const requestSearch = (e) => {
      setSearched(e.target.value);
      let filteredRows = allContracts.filter((row) => {
          return (row.fullName && row.fullName.toLowerCase().includes(e.target.value.toLowerCase())) || 
          (row.subStatus && row.subStatus.toLowerCase().includes(e.target.value.toLowerCase())) || 
          (row.status && row.status.toLowerCase().includes(e.target.value.toLowerCase())) ||
          (row.contractNumber && row.contractNumber.includes(e.target.value))||
          (row.customerNumber && row.customerNumber.includes(e.target.value))||
          (row.createdDate && row.createdDate.toLowerCase().includes(e.target.value.toLowerCase())) ||
          (row.email && row.email.toLowerCase().includes(e.target.value.toLowerCase()))       
      });
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
              onClick={()=>sortItems(headCell.field)}
          >
              <TableSortLabel
              active={orderBy === headCell.field}
              direction={orderBy === headCell.field ? order : 'asc'}
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
          {filteredContracts && filteredContracts.map((row) => (
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
