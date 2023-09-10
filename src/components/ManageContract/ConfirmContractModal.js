import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CustomDatePicker from '../common/CustomDatePicker';

// const rows = [
//     {
//         category: 'Base Product',
//         oldValue: 'Tesla Model Y',
//         newValue: 'BMW X5',
//         effectiveFrom: '',

//     }
// ];

export default function ConfirmContractModal({ open, handleClose, newData = [], handleSubmit, expDataForModal }) {
    console.log('new data', newData)
    const [effectiveFromDate, setEffectiveDate] = React.useState();
    const [updatedData, setData] = React.useState([])
    const setDate = (val) => {
        setEffectiveDate(val);
    }
    console.log('combined data here',[...newData, ...expDataForModal])
    React.useEffect(()=> {
        setData([...newData, ...expDataForModal])
    }, [])
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth={true}
            maxWidth={'md'}
        >
            <DialogTitle>Confirm Changes</DialogTitle>
            <DialogContent>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Category</TableCell>
                                <TableCell>Old Value</TableCell>
                                <TableCell>New Value</TableCell>
                                <TableCell>Effective From</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {updatedData.map((row, index) => (
                                <TableRow
                                    key={row.category + index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.category}
                                    </TableCell>
                                    <TableCell>{row.oldValue}</TableCell>
                                    <TableCell>{row.newValue}</TableCell>
                                    <TableCell>{
                                        row.category === 'Base Product' ?
                                            <CustomDatePicker
                                                className='pause-modal'
                                                label="Effective from"
                                                name="effectiveDate"
                                                value={effectiveFromDate}
                                                onChangeHandler={(val) => setDate(val)}
                                                disablePast={true}
                                            /> : row.effectiveFrom
                                    }
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={() => handleSubmit(effectiveFromDate)}>Confirm</Button>
            </DialogActions>
        </Dialog>
    )
}