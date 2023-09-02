import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';

const currencies = [
    {
        value: 1,
        label: 1,
    },
    {
        value: 2,
        label: 2,
    },
    {
        value: 3,
        label: 3,
    },
    {
        value: 4,
        label: 4,
    },
    {
        value: 5,
        label: 5,
    },
    {
        value: 6,
        label: 6,
    },
    {
        value: 7,
        label: 7,
    },
    {
        value: 8,
        label: 8,
    }
];

export default function MileageCaptureModal({ 
    open, 
    handleClose,
    mileageLabel='',
    fuelLevelLabel=''
}) {
    const onChangeHandler = (e) => {
        console.log(e.target.value, 'value');
        console.log(e.target.name, 'name');
    }
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Subscribe</DialogTitle>
            <DialogContent>
                <DialogContentText style={{marginBottom: '8px'}}>
                    Please enter Start Mileage and Start Fuel Level
                </DialogContentText>
                <div style={{marginBottom: '6px'}}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        name='mileage'
                        label={mileageLabel}
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={onChangeHandler}
                        fullWidth
                    />
                </div>

                <div style={{marginBottom: '6px'}}>
                    <TextField
                        id="outlined-select-currency"
                        select
                        label={fuelLevelLabel}
                        fullWidth
                        name='fuelLevel'
                        onChange={onChangeHandler}
                    >
                        {currencies.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose}>Confirm</Button>
            </DialogActions>
        </Dialog>
    )
}