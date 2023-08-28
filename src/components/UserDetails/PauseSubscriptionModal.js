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
import dayjs from 'dayjs';

export default function PauseSubscriptionModal({ open, handleClose, handleSubmit }) {
    const [startDate, updateStartDate] = React.useState();
    const [endDate, updateEndDate] = React.useState();
    const [currentStep, updateStep] = React.useState(1);
    const changeDate = (type, val) => {
        if (type === 'start') {
            updateStartDate(val)
        }
        if (type === 'end') {
            updateEndDate(val)
        }
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle sx={{ m: 0, p: 2 }}>
                Pause Subscription
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
                    {currentStep === 1 && (
                        <React.Fragment>
                            <DialogContentText>
                                Please choose a start date to pause the subscription.
                            </DialogContentText>
                            <CustomDatePicker
                                className='pause-modal'
                                label="Start Date"
                                value={startDate}
                                onChangeHandler={(val) => changeDate('start', val)}
                                disablePast={true}
                            />
                            <CustomDatePicker
                                className='pause-modal'
                                label="End Date"
                                value={endDate}
                                disablePast={true}
                                onChangeHandler={(val) => changeDate('end', val)}
                            />
                        </React.Fragment>
                    )}
                    {currentStep === 2 && (
                        <React.Fragment>
                            <DialogContentText>
                                <span>Your Subscription will be paused from {dayjs(startDate).format('DD/MM/YYYY')} .</span>
                                <span><Button variant="text" onClick={()=> updateStep(1)}>Click here</Button> to modify or click Submit to proceed</span>
                            </DialogContentText>
                        </React.Fragment>
                    )}
                </React.Fragment>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                {currentStep === 1 && <Button onClick={()=> updateStep(2)}>Next</Button>}
                {currentStep === 2 && <Button onClick={() => handleSubmit(startDate, endDate)}>Submit</Button>}
            </DialogActions>
        </Dialog>
    )
}