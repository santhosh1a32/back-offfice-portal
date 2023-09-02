import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Radio, RadioGroup, FormControlLabel } from '@mui/material';

const rows = [
    { id: 1, vehicleModel: 'Tesla Model Y', registrationPlate: 'MUC 7632', transmission: 'Automatic', color: 'White', 'registrationDate': '01/08/2020', dealer: 'Test Dealer' },
    { id: 2, vehicleModel: 'Audi Model Y', registrationPlate: 'MUC 7632', transmission: 'Automatic', color: 'White', 'registrationDate': '01/08/2020', dealer: 'Test Dealer' },
    { id: 3, vehicleModel: 'Benz Model Y', registrationPlate: 'MUC 7632', transmission: 'Automatic', color: 'White', 'registrationDate': '01/08/2020', dealer: 'Test Dealer' },
    { id: 4, vehicleModel: 'Amazda Model Y', registrationPlate: 'MUC 7632', transmission: 'Automatic', color: 'White', 'registrationDate': '01/08/2020', dealer: 'Test Dealer' },
    { id: 5, vehicleModel: 'Tesla Model D', registrationPlate: 'MUC 7632', transmission: 'Automatic', color: 'White', 'registrationDate': '01/08/2020', dealer: 'Test Dealer' },
    // Add more rows as needed
];

export default function VehicleAllocationModal({ open, handleClose }) {
    const [selectedItem, setSelectedItem] = React.useState(null);

    const handleRadioChange = (event) => {
        setSelectedItem(event.target.value);
    };
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
                            {rows.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>
                                        <RadioGroup value={selectedItem} onChange={handleRadioChange}>
                                            <FormControlLabel
                                                value={row.id.toString()}
                                                control={<Radio />}
                                            />
                                        </RadioGroup>
                                    </TableCell>
                                    <TableCell>{row.vehicleModel}</TableCell>
                                    <TableCell>{row.registrationPlate}</TableCell>
                                    <TableCell>{row.transmission}</TableCell>
                                    <TableCell>{row.color}</TableCell>
                                    <TableCell>{row.registrationDate}</TableCell>
                                    <TableCell>{row.dealer}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose}>Confirm</Button>
            </DialogActions>
        </Dialog>
    )
}