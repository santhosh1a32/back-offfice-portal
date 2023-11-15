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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function PauseSubscriptionModal({ open, handleClose, handleSubmit, pausecontractData, pauseCancelReasons}) {
    const [currentStep, updateStep] = React.useState(1);
    const [pauseReason, setPauseReason] = React.useState();
    const [pauseData, setPauseData] = React.useState({});

    const onChangeHandler = (val,name) => {
        let obj = { ...pauseData };
            console.log(val, 'value');
            console.log(name, 'name');
            obj[name] = val;
        setPauseData(obj);
    }

    React.useEffect(() => {
        if (pausecontractData) {
            setPauseData({ ...pausecontractData });
            console.log(pauseData);
        }
    }, [pausecontractData])


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
                                name='startDate'
                                value={pauseData.startDate}
                                onChangeHandler={(val) => onChangeHandler(val,'startDate')}
                                disablePast={true}
                            />
                            <CustomDatePicker
                                className='pause-modal'
                                label="End Date"
                                name='endDate'
                                value={pauseData.endDate}
                                disablePast={true}
                                onChangeHandler={(val) => onChangeHandler(val,'endDate')}
                            />
                            <FormControl fullWidth className='pause-modal'>
                            <InputLabel id="demo-simple-select-pause-label">Pause Reason</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Pause Reason"
                                name='pauseReasonId'
                                value={pauseData.pauseReasonId}
                                onChange={(val) => onChangeHandler(val.target.value,'pauseReasonId')}
                            >   
                            {
                                Object.entries(pauseCancelReasons).map((pauseReason) =>
                                (<MenuItem key={pauseReason[0]} value={pauseReason[0]}>
                                    {pauseReason[1]}</MenuItem>)
                                )}                          
                            </Select>
                            </FormControl>
                        </React.Fragment>
                    )}
                    {currentStep === 2 && (
                        <React.Fragment>
                            <DialogContentText>
                                <span>Your Subscription will be paused from {dayjs(pauseData.startDate).format('DD/MM/YYYY')} .</span>
                                <span><Button variant="text" onClick={()=> updateStep(1)}>Click here</Button> to modify or click Submit to proceed</span>
                            </DialogContentText>
                        </React.Fragment>
                    )}
                </React.Fragment>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                {currentStep === 1 && <Button onClick={()=> updateStep(2)}>Next</Button>}
                {currentStep === 2 && <Button onClick={() => handleSubmit(pauseData.startDate, pauseData.endDate, pauseData.pauseReasonId)}>Submit</Button>}
            </DialogActions>
        </Dialog>
    )
}