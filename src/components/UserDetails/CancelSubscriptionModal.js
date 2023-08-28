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

export default function CancelSubscriptionModal({ open, handleClose, showPauseModal, handleSubmit }) {
    const [currentStep, updateStep] = React.useState(1);
    const [cancelDate, setDate] = React.useState()
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
                    {currentStep === 1 && (
                        <DialogContentText>
                            <span>You can pause the subscription and enjoy the same price, when you are want to continue. <Button variant="text" onClick={showPauseModal}>Click here to pause subscription</Button> </span>
                            <span> To continue cancellation click on Next</span>
                        </DialogContentText>
                    )}
                    {currentStep === 2 && (
                        <React.Fragment>
                            <DialogContentText>
                                Please choose a date to cancel the subscription.
                            </DialogContentText>
                            <CustomDatePicker
                                className='pause-modal'
                                label="Cancellation Date"
                                value={cancelDate}
                                onChangeHandler={(val) => setDate(val)}
                                disablePast={true}
                            />
                        </React.Fragment>
                    )}
                    {currentStep === 3 && (
                        <React.Fragment>
                            <DialogContentText>
                                <span>Your Subscription will be Cancelled from {dayjs(cancelDate).format('DD/MM/YYYY')} .</span>
                                <span><Button variant="text" onClick={()=> updateStep(2)}>Click here</Button> to modify or click Submit to proceed</span>
                            </DialogContentText>
                        </React.Fragment>
                    )}
                </React.Fragment>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
                {currentStep === 1 && <Button onClick={() => updateStep(2)}>Next</Button>}
                {currentStep === 2 && <Button onClick={() => updateStep(3)}>Next</Button>}
                {currentStep === 3 && <Button onClick={() => handleSubmit(cancelDate)}>Submit</Button>}
            </DialogActions>
        </Dialog>
    )
}