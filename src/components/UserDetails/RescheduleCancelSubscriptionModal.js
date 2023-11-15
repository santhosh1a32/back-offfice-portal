import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CustomDatePicker from '../common/CustomDatePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import dayjs from 'dayjs';

export default function RescheduleCancelSubscriptionModal({ open, handleClose, handleSubmit, cancelcontractData, cancelReasons}) {
    const [currentStep, updateStep] = React.useState(2);
    const [cancelData, setCancelData] = React.useState(cancelcontractData);

    const onChangeHandler = (val,name) => {
        let obj = { ...cancelData };
        console.log(val, 'value');
        console.log(name, 'name');
        obj[name] = val;
        setCancelData(obj);
    }

    React.useEffect(() => {
        if (cancelcontractData) {
            setCancelData({ ...cancelcontractData });
        }
    }, [cancelcontractData])

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle sx={{ m: 0, p: 2 }}>
                Cancel Subscription
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <React.Fragment>
                    {
                      <React.Fragment>
                            <DialogContentText>
                                Please choose a date to cancel the subscription.
                            </DialogContentText>
                            <CustomDatePicker
                                className='pause-modal'
                                label="Cancellation Date"
                                name='cancelDate'
                                value={cancelData.cancelDate}
                                onChangeHandler={(val) => onChangeHandler(val,'cancelDate')}
                                disablePast={true}
                            />
                            <FormControl fullWidth className='pause-modal'>
                                <InputLabel id="demo-simple-select-pause-label">Cancellation Reason</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Pause Reason"
                                    name='cancellationReasonId'
                                    value={cancelData.cancellationReasonId}
                                    onChange={(val) => onChangeHandler(val.target.value,'cancellationReasonId')}
                                >                             
                                    {
                                    Object.entries(cancelReasons).map((cancelReason) =>
                                    (<MenuItem key={cancelReason[0]} value={cancelReason[0]}>
                                        {cancelReason[1]}</MenuItem>)
                                    )}
                                </Select>
                            </FormControl>
                        </React.Fragment>
                    }
                    {currentStep === 3 && (
                        <React.Fragment>
                            <DialogContentText>
                                <span>Your Subscription will be Cancelled from {dayjs(cancelData.cancelDate).format('DD/MM/YYYY')} .</span>
                                <span><Button variant="text" onClick={()=> updateStep(2)}>Click here</Button> to modify or click Submit to proceed</span>
                            </DialogContentText>
                        </React.Fragment>
                    )}
                </React.Fragment>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
                {currentStep === 2 && <Button onClick={() => updateStep(3)}>Next</Button>}
                {currentStep === 3 && <Button onClick={() => handleSubmit(cancelData.cancelDate, cancelData.cancellationReasonId)}>Submit</Button>}
            </DialogActions>
        </Dialog>
    )
}