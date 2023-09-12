import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Grid, TextField, Paper, InputLabel } from '@mui/material';
import CustomDatePicker from '../common/CustomDatePicker';
import DriverDetails from './DriverDetails';
import dayjs from 'dayjs';

export default function DrivingLicenseModal({ open, handleClose, drivingLicenseDetails, handleSubmit, updateTaskStatus }) {
    const [licenseDetails, setLiscenseDetails] = React.useState({});
    const [detailsMode, setDetailsMode] = React.useState(false);
    const [currentSelectedDriverId, setCurrentSelection] = React.useState();
    const handleChange = (event) => {
        let obj = { ...licenseDetails }
        obj[event.target.name] = event.target.value;
        setLiscenseDetails(obj);
    }
    const setDate = (val, field) => {
        let obj = { ...licenseDetails }
        obj[field] = val;
        setLiscenseDetails(obj);
    }
    const verifyHandler = (licenseDetails, driverId) => {
        console.log('details', licenseDetails);
        setLiscenseDetails(licenseDetails);
        setCurrentSelection(driverId);
        setDetailsMode(true);
    }
    const updateDLVerificationStatus = (data) => {
        handleSubmit({
            jsonData: {
                drivingLicenseDetails: data
            }
        }, 'Verification Status')
    }
    const updateDriverDetails = () => {
        let tempArray = [...drivingLicenseDetails];
        tempArray.forEach(item => {
            if (item.registerDriverId === currentSelectedDriverId) {
                item.licenseDetails = licenseDetails;
            }
        })
        handleSubmit({
            jsonData: {
                drivingLicenseDetails: tempArray
            }
        }, 'status')
    }
    React.useEffect(() => {
        setDetailsMode(false);
    }, [drivingLicenseDetails])
    return (
        <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="lg">
            {!detailsMode && (
                <React.Fragment>
                    <DialogTitle>Driver Details</DialogTitle>
                    <DialogContent>
                        <DriverDetails
                            drivingLicenseDetails={drivingLicenseDetails}
                            verifyHandler={verifyHandler}
                            handleChange={updateDLVerificationStatus}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={updateTaskStatus}>Confirm</Button>
                    </DialogActions>
                </React.Fragment>
            )}
            {detailsMode && (
                <React.Fragment>
                    <DialogTitle>Driving License Verification</DialogTitle>
                    <DialogContent>
                        <DialogContentText style={{marginBottom: '12px'}}>
                            Driving License Details
                        </DialogContentText>
                        <Grid container>
                            <Grid item xs={6}>
                                <TextField
                                    className='width-80'
                                    label="First Name"
                                    variant="standard"
                                    name='firstName'
                                    value={licenseDetails.firstName}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    className='width-80'
                                    label="Last Name"
                                    variant="standard"
                                    name='lastName'
                                    value={licenseDetails.lastName}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    className='width-80'
                                    label="License Number"
                                    variant="standard"
                                    name='licenseNumber'
                                    value={licenseDetails.licenseNumber}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    className='width-80'
                                    label="Issuing country"
                                    variant="standard"
                                    name='issuingCountry'
                                    value={licenseDetails.issuingCountry}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                            {/* <Grid item xs={6}>
                                <TextField
                                    label="Result of verification check"
                                    variant="standard"
                                    name='verificationResult'
                                    value={licenseDetails.verificationResult}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid> */}
                            <Grid item xs={6} className='width-80'>
                                <CustomDatePicker
                                    className='pause-modal'
                                    label="Issuing Date"
                                    name="issuingDate"
                                    value={dayjs(licenseDetails.issuingDate)}
                                    onChangeHandler={(val) => setDate(val, 'issuingDate')}
                                    disablePast={false}
                                />
                            </Grid>
                            <Grid item xs={6} className='width-80'>
                                <CustomDatePicker
                                    className='pause-modal'
                                    label="Expiration date of document"
                                    name="expiryDate"
                                    value={dayjs(licenseDetails.expiryDate)}
                                    onChangeHandler={(val) => setDate(val, 'expiryDate')}
                                    disablePast={true}
                                />
                            </Grid>
                        </Grid>
                        <DialogContentText style={{marginBottom: '12px', marginTop: '12px'}}>
                            Verification Details
                        </DialogContentText>
                        <Grid container>
                            <Grid item xs={6}>
                                <TextField
                                    className='width-80'
                                    label="Check Performed By"
                                    variant="standard"
                                    name='checkPerformedBy'
                                    value={licenseDetails.checkPerformedBy}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>

                            <Grid item xs={6} className='width-80'>
                                <CustomDatePicker
                                    className='pause-modal'
                                    label="Check performed Date"
                                    name="checkPerformedDate"
                                    value={dayjs(licenseDetails.checkPerformedDate)}
                                    onChangeHandler={(val) => setDate(val, 'checkPerformedDate')}
                                    disablePast={false}
                                />
                                {/* <TextField
                            label="Date of birth"
                            variant="outlined"
                            name='dob'
                            value={licenseDetails.dob}
                            onChange={handleChange}
                            fullWidth
                        /> */}
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    className='width-80'
                                    label="Check Status"
                                    variant="standard"
                                    name='checkStatus'
                                    value={licenseDetails.checkStatus}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    className='width-80'
                                    label="Check Failure Reason"
                                    variant="standard"
                                    name='checkFailureReason'
                                    disabled={!licenseDetails.checkStatus}
                                    value={licenseDetails.checkFailureReason}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>

                        </Grid>
                        <DialogContentText style={{marginBottom: '12px', marginTop: '12px'}}>
                            Attachments
                        </DialogContentText>
                        <div>
                            <Grid container>
                                <Grid item xs={6}>DL Front Page</Grid>
                                <Grid item xs={6}><a href={licenseDetails.frontSideDocumentUrl} target='_blank'>View</a></Grid>
                                <Grid item xs={6}>DL Back Page</Grid>
                                <Grid item xs={6}><a href={licenseDetails.backSideDocumentUrl} target='_blank'>View</a></Grid>
                                <Grid item xs={6}>Selfie Document URL</Grid>
                                <Grid item xs={6}><a href={licenseDetails.checkDocumentUrl} target='_blank'>View</a></Grid>
                                <Grid item xs={6}>Selfie URL</Grid>
                                <Grid item xs={6}><a href={licenseDetails.checkSelfieUrl} target='_blank'>View</a></Grid>
                            </Grid>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDetailsMode(false)}>Cancel</Button>
                        <Button onClick={updateDriverDetails}>Update</Button>
                    </DialogActions>
                </React.Fragment>
            )}
        </Dialog>
    )
}