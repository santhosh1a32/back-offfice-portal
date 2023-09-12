import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Radio, RadioGroup, FormControlLabel } from '@mui/material';

const rows = [
    { vehicleId: 1, name: 'Tesla Model Y', registrationPlate: 'MUC 7632', transmission: 'Automatic', exteriorColor: 'White', 'registrationDate': '01/08/2020', providerName: 'Test Dealer' },
    { vehicleId: 2, name: 'Audi Model Y', registrationPlate: 'MUC 7632', transmission: 'Automatic', exteriorColor: 'White', 'registrationDate': '01/08/2020', providerName: 'Test Dealer' },
    { vehicleId: 3, name: 'Benz Model Y', registrationPlate: 'MUC 7632', transmission: 'Automatic', exteriorColor: 'White', 'registrationDate': '01/08/2020', providerName: 'Test Dealer' },
    { vehicleId: 4, name: 'Amazda Model Y', registrationPlate: 'MUC 7632', transmission: 'Automatic', exteriorColor: 'White', 'registrationDate': '01/08/2020', providerName: 'Test Dealer' },
    { vehicleId: 5, name: 'Tesla Model D', registrationPlate: 'MUC 7632', transmission: 'Automatic', exteriorColor: 'White', 'registrationDate': '01/08/2020', providerName: 'Test Dealer' },
    // Add more rows as needed
];

export default function VehicleAllocationModal({ open, handleClose, vehicleDetails= [], handleSubmit }) {
    const [selectedItem, setSelectedItem] = React.useState(null);
    const [availableOptions, setAvailableOptions] = React.useState([])

    const handleRadioChange = (event) => {
        setSelectedItem(event.target.value);
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
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Select</TableCell>
                                <TableCell>Vehicle Model</TableCell>
                                <TableCell>Registration Plate</TableCell>
                                <TableCell>Transmission</TableCell>
                                <TableCell>Exterior Color</TableCell>
                                <TableCell>Registration Date</TableCell>
                                <TableCell>Dealer Name</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {availableOptions.length && availableOptions.map((row) => (
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