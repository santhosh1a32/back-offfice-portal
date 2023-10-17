import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import { visuallyHidden } from '@mui/utils';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Radio, RadioGroup, FormControlLabel, TableSortLabel } from '@mui/material';

const rows = [
    { vehicleId: 1, name: 'Tesla Model Y', registrationPlate: 'MUC 7632', transmission: 'Automatic', exteriorColor: 'White', registrationDate: '01/08/2020', providerName: 'MTest Dealer' },
    { vehicleId: 2, name: 'Audi Model Y', registrationPlate: 'MUC 7632', transmission: 'Automatic', exteriorColor: 'White', registrationDate: '01/08/2020', providerName: 'BTest Dealer' },
    { vehicleId: 3, name: 'Benz Model Y', registrationPlate: 'MUC 7632', transmission: 'Automatic', exteriorColor: 'White', registrationDate: '01/08/2020', providerName: 'CTest Dealer' },
    { vehicleId: 4, name: 'Amazda Model Y', registrationPlate: 'MUC 7632', transmission: 'Automatic', exteriorColor: 'White', registrationDate: '01/08/2020', providerName: 'ATest Dealer' },
    { vehicleId: 5, name: 'Tesla Model D', registrationPlate: 'MUC 7632', transmission: 'Automatic', exteriorColor: 'White', registrationDate: '01/08/2020', providerName: 'ZTest Dealer' },
    // Add more rows as needed
];
const headCells = [
    {
      id: 'select',
      numeric: false,
      disablePadding: true,
      label: 'Select',
    },
    {
      id: 'name',
      numeric: false,
      disablePadding: false,
      label: 'Vehicle Model',
    },
    {
        id: 'registrationPlate',
        numeric: false,
        disablePadding: false,
        label: 'Registration Plate',
      },
      {
        id: 'transmission',
        numeric: false,
        disablePadding: false,
        label: 'Transmission',
      },
      {
        id: 'exteriorColor',
        numeric: false,
        disablePadding: false,
        label: 'Exterior Color',
      },
      {
        id: 'registrationDate',
        numeric: false,
        disablePadding: false,
        label: 'Registration Date',
      },
      {
        id: 'providerName',
        numeric: false,
        disablePadding: false,
        label: 'Dealer Name',
      }
] 
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

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      console.log(a,b);
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

export default function VehicleAllocationModal({ open, handleClose, vehicleDetails= [], handleSubmit }) {
    const [selectedItem, setSelectedItem] = React.useState(null);
    const [availableOptions, setAvailableOptions] = React.useState(rows);
    const [filteredOptions, setFilteredOptions] = React.useState(rows);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('name');
    const [searched, setSearched] = React.useState("");

    const handleRadioChange = (event) => {
        setSelectedItem(event.target.value);
    };
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
        console.log(order,orderBy);
      };
    const createSortHandler = (property) => (event) => {
        handleRequestSort(event, property);
    };

    const visibleRows = React.useMemo(
        () =>
          stableSort(filteredOptions, getComparator(order, orderBy)),
        [order, orderBy,filteredOptions],
      );
    
    const requestSearch = (e) => {
        setSearched(e.target.value);
        let filteredRows = availableOptions.filter((row) => {
            return row.name.toLowerCase().includes(e.target.value.toLowerCase());
        });
        setFilteredOptions(filteredRows);
    };


    React.useEffect(() => {
        if (window['BackOfficePortalCtrl']) {
            setAvailableOptions(vehicleDetails);
            vehicleDetails.forEach(item => {
                if(item.selected) {
                    setSelectedItem(item.vehicleId);
                }
            })
        }else {
            setAvailableOptions(rows)
        }
    },[vehicleDetails])
    return (
        <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="md">
            <DialogTitle>Vehicle Allocation</DialogTitle>
            <DialogContent>
            <div className='search-field'><TextField id="standard-basic-search"  InputProps={{ startAdornment: ( <InputAdornment position="start"> <SearchIcon /> </InputAdornment> ), }} variant="standard" 
             placeholder="Search here" value={searched} onChange={requestSearch}/></div>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                            {headCells.map((headCell) => (
                                <TableCell
                                    key={headCell.id}
                                    align={headCell.numeric ? 'right' : 'left'}
                                    padding={headCell.disablePadding ? 'none' : 'normal'}
                                    sortDirection={orderBy === headCell.id ? order : false}
                                >
                                    <TableSortLabel
                                    active={orderBy === headCell.id}
                                    direction={orderBy === headCell.id ? order : 'asc'}
                                    onClick={createSortHandler(headCell.id)}
                                    >
                                    {headCell.label}
                                    {orderBy === headCell.id ? (
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
                            {visibleRows.length && visibleRows.map((row) => (
                                <TableRow key={row.vehicleId}>
                                    <TableCell>
                                        <RadioGroup value={selectedItem} onChange={handleRadioChange}>
                                            <FormControlLabel
                                                value={row.vehicleId.toString()}
                                                control={<Radio />}
                                            />
                                        </RadioGroup>
                                    </TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.registrationPlate}</TableCell>
                                    <TableCell>{row.transmission}</TableCell>
                                    <TableCell>{row.exteriorColor}</TableCell>
                                    <TableCell>{row.registrationDate}</TableCell>
                                    <TableCell>{row.providerName}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={() => handleSubmit(selectedItem)}>Confirm</Button>
            </DialogActions>
        </Dialog>
    )
}