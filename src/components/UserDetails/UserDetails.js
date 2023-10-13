import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import './userDetails.scss';
import Plan from './Plan';
import ExpProduct from './ExpProduct';
import Products from './Products';
import CustomerDetails from './CustomerDetails';
import SectionWithTitle from '../common/SectionWithTitle';
import DriverDetails from "./DriverDetails";
import InvoiceDetails from "./InvoiceDetails";
import OtherPaymentsDetails from "./OtherPaymentsDetails";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CONTRACT_DETAILS } from './mockData';
import Chip from '@mui/material/Chip';
import { getDataWithParam, saveDataWithParam } from '../../DataService';
import { useSearchParams, useNavigate, createSearchParams } from 'react-router-dom';
import { Button } from '@mui/material';
import PauseSubscriptionModal from './PauseSubscriptionModal';
import CancelSubscriptionModal from './CancelSubscriptionModal';
// import ManageContractModal from './ManageContractModal';
import InfoBanner from '../common/InfoBanner/InfoBanner';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PauseCircleOutlinedIcon from '@mui/icons-material/PauseCircleOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import UpcomingContractConfirm from './UpcomingContractConfirm';
import DontPauseModal from './DontPauseModal';
import DontCancelModal from './DontCancelModal'

import dayjs from 'dayjs';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const UserDetails = () => {
    const [expanded, setExpanded] = React.useState();
    const [contractDetails, updateContractDetails] = React.useState(CONTRACT_DETAILS);
    const [searchParams] = useSearchParams();
    const [openPauseDialog, setPauseDialog] = React.useState(false);
    const [openCancelDialog, setCancelDialog] = React.useState(false);
    const [openDontPauseDialog, setDontPauseDialog] = React.useState(false);
    const [openDontCancelDialog, setDontCancelDialog] = React.useState(false);
    const [openMangeContractDialog, setManageContractDialog] = React.useState(false);
    const [activeContractVersionId, setActiveContractVersionId] = React.useState();
    const [driverDetails, setDriverDetails] = React.useState([]);
    const [snackBarConfig, setSnackbarConfig] = React.useState({
        openToast: false,
        vertical: 'top',
        horizontal: 'right',
        severity: '',
        toastMessage: ''
    });
    const navigate = useNavigate();

    const openCheckList = () =>{
        const activeContractVersion = getActiveContractVersionDetails();
        const activeContractVersionId = activeContractVersion && activeContractVersion.length ? activeContractVersion[0].contractVersionId : '';
        navigate({ pathname:"/checkList", search:createSearchParams({ contractId:searchParams.get("contractId"), contractVersionId:activeContractVersionId, checkListType:"Pickup" }).toString()})
    }

    const deliveryCheckList = () =>{
        const activeContractVersion = getActiveContractVersionDetails();
        const activeContractVersionId = activeContractVersion && activeContractVersion.length ? activeContractVersion[0].contractVersionId : '';
        navigate({ pathname:"/checkList", search:createSearchParams({ contractId:searchParams.get("contractId"), contractVersionId:activeContractVersionId, checkListType:"Delivery" }).toString()})
    }

    const collectionCheckList = () =>{
        const activeContractVersion = getActiveContractVersionDetails();
        const activeContractVersionId = activeContractVersion && activeContractVersion.length ? activeContractVersion[0].contractVersionId : '';
        navigate({ pathname:"/checkList", search:createSearchParams({ contractId:searchParams.get("contractId"), contractVersionId:activeContractVersionId, checkListType:"Collection" }).toString()})
    }

    const goToManageContract = () => {
        navigate({ pathname:"/manageContract", search:createSearchParams({ contractId:searchParams.get("contractId"), contractVersionId:activeContractVersionId }).toString()})
    }

    const navigateToManageContract = () => {
        const isUpcomingVersionPresent = contractVersion.filter(item => item.headerStatus === 'Upcoming');
        console.log(isUpcomingVersionPresent);
        if(isUpcomingVersionPresent && isUpcomingVersionPresent.length) {
            setManageContractDialog(true);
        }else {
            goToManageContract();
        }
    }

    const { openToast, vertical, horizontal, severity, toastMessage } = snackBarConfig;

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const closePauseDialog = () => {
        setPauseDialog(false);
    }
    const closeDontPauseDialog = () => {
        setDontPauseDialog(false)
    }

    const closeCancelDialog = () => {
        setCancelDialog(false);
    }

    const closeDontCancelDialog = () => {
        setDontCancelDialog(false);
    }

    const closeManageContractDialog = () => {
        setManageContractDialog(false);
    }

    const showPauseModal = () => {
        closeCancelDialog();
        setPauseDialog(true);
    }

    const onToastClose = () => {
        setSnackbarConfig({ ...snackBarConfig, openToast: false });
    }

    const { contractVersion } = contractDetails;

    const tempContractDetails = {
        contractNumber: contractDetails.contractNumber,
        contractType: contractDetails.contractType,
        customerName: contractDetails.firstName + ' ' + contractDetails.lastName,
        customerId: contractDetails.customerId,
        status: contractDetails.status,
        renewalType: contractDetails.renewalfrequency,
        mobile: contractDetails.mobile,
        email: contractDetails.email,
        contractStartDate: contractDetails.startDate,
        contractEndDate: contractDetails.endDate
    }

    const getContractDetails = () => {
        var obj = { contractId: searchParams.get("contractId") }
        if (window['BackOfficePortalCtrl']) {
            getDataWithParam('BackOfficePortalCtrl', 'getContractDetails', JSON.stringify(obj)).then(result => {
                console.log(result);
                updateContractDetails(result);
            })
        }
    }

    const getActiveContractVersionDetails = () => {
        return contractVersion.filter(item => item.status === 'Active');
    }

    const changeContract = (obj) => {
        if (window['BackOfficePortalCtrl']) {
            saveDataWithParam('BackOfficePortalCtrl', 'contractChangeRequest', JSON.stringify(obj)).then(result => {
                if (result && result.status === 'Success') {
                    getContractDetails();
                } else {
                    console.log('error')
                }
                if (openPauseDialog) {
                    closePauseDialog();
                }
                if(openDontPauseDialog) {
                    closeDontPauseDialog();
                }
                if (openCancelDialog) {
                    closeCancelDialog();
                }
                if(openDontCancelDialog) {
                    closeDontCancelDialog();
                }
                if(openMangeContractDialog) {
                    closeManageContractDialog();
                }
            })
        }
    }

    const pauseSubscription = (startDate, endDate = '') => {
        const activeContractVersion = getActiveContractVersionDetails();
        const activeContractVersionId = activeContractVersion && activeContractVersion.length ? activeContractVersion[0].contractVersionId : '';
        const obj = {
            contractChangeRequestType: "Pause Subscription",
            contractId: contractDetails.contractId, //mandatory
            contractVersionId: activeContractVersionId, //mandatory
            newVersionStartDate: dayjs(startDate).format('YYYY-MM-DD'),
            newVersionEndDate: endDate ? dayjs(endDate).format('YYYY-MM-DD') : null, //Optional
            comments: ""
        }
        if(contractDetails.contractUUID) {
            obj.contractUUID = contractDetails.contractUUID;
        }
        if(contractVersion && contractVersion.length && contractVersion[0].contractVersionUUID && contractVersion[0].headerStatus === 'Upcoming'){
            obj.upcomingContractVersionUUID = contractVersion[0].contractVersionUUID;
        }
        changeContract(obj);
        setSnackbarConfig({ ...snackBarConfig, open: true, toastMessage: 'Contract Updated Successfully' });
    }
    const dontPauseSubscription = () => {
        const activeContractVersion = getActiveContractVersionDetails();
        const activeContractVersionId = activeContractVersion && activeContractVersion.length ? activeContractVersion[0].contractVersionId : '';
        const obj = {
            contractChangeRequestType: "Don't Pause",
            contractId: contractDetails.contractId, //mandatory
            contractVersionId: activeContractVersionId, //mandatory
            comments: ""
        }
        if(contractDetails.contractUUID) {
            obj.contractUUID = contractDetails.contractUUID;;
        }
        if(contractVersion && contractVersion.length && contractVersion[0].contractVersionUUID && contractVersion[0].headerStatus === 'Upcoming'){
            obj.upcomingContractVersionUUID = contractVersion[0].contractVersionUUID;
        }
        changeContract(obj);
        setSnackbarConfig({ ...snackBarConfig, open: true, toastMessage: 'Contract Updated Successfully' });
    }

    const cancelSubscription = (endDate) => {
        const activeContractVersion = getActiveContractVersionDetails();
        const activeContractVersionId = activeContractVersion && activeContractVersion.length ? activeContractVersion[0].contractVersionId : '';
        const obj = {
            contractChangeRequestType: "Cancel Subscription",
            contractId: contractDetails.contractId, //mandatory
            contractVersionId: activeContractVersionId, //mandatory
            newVersionEndDate: dayjs(endDate).format('YYYY-MM-DD'), //mandatory
            comments: ""
        }
        if(contractDetails.contractUUID) {
            obj.contractUUID = contractDetails.contractUUID;;
        }
        if(contractVersion && contractVersion.length && contractVersion[0].contractVersionUUID && contractVersion[0].headerStatus === 'Upcoming'){
            obj.upcomingContractVersionUUID = contractVersion[0].contractVersionUUID;
        }
        changeContract(obj);
    }

    const dontCancelSubscription = () => {
        const activeContractVersion = getActiveContractVersionDetails();
        const activeContractVersionId = activeContractVersion && activeContractVersion.length ? activeContractVersion[0].contractVersionId : '';
        const obj = {
            contractChangeRequestType: "Don't Cancel",
            contractId: contractDetails.contractId, //mandatory
            contractVersionId: activeContractVersionId, //mandatory
            comments: ""
        }
        if(contractDetails.contractUUID) {
            obj.contractUUID = contractDetails.contractUUID;;
        }
        if(contractVersion && contractVersion.length && contractVersion[0].contractVersionUUID && contractVersion[0].headerStatus === 'Upcoming'){
            obj.upcomingContractVersionUUID = contractVersion[0].contractVersionUUID;
        }
        changeContract(obj);
        setSnackbarConfig({ ...snackBarConfig, open: true, toastMessage: 'Contract Updated Successfully' });
    }

    const submitManageContract = (data) => {
        const activeContractVersion = getActiveContractVersionDetails();
        const activeContractVersionId = activeContractVersion && activeContractVersion.length ? activeContractVersion[0].contractVersionId : '';
        const obj = {
            ...data, 
            contractChangeRequestType: 'Manage Contract', 
            contractId: contractDetails.contractId, //mandatory
            contractVersionId: activeContractVersionId, //mandatory
            newVersionStartDate: dayjs(new Date()).format('YYYY-MM-DD'),
            comments: ""
        }
        changeContract(obj);
    }

    const getDriverDetails = () => {
         var obj = { contractId: searchParams.get("contractId") }
        if (window['BackOfficePortalCtrl']) {
            getDataWithParam('BackOfficePortalCtrl', 'getDriverDetails', JSON.stringify(obj)).then(result => {
                console.log('Driver details' , result, '<=========');
                if(result && result.registeredDrivers && result.registeredDrivers.length) {
                    setDriverDetails(result.registeredDrivers);
                }
                // updateContractDetails(result);
            })
        }
    }

    React.useEffect(() => {
        const activeContractVersion = getActiveContractVersionDetails();
        const activeContractVersionId = activeContractVersion && activeContractVersion.length ? activeContractVersion[0].contractVersionId : '';
        setActiveContractVersionId(activeContractVersionId);
        getDriverDetails();
    },[contractDetails])

    React.useEffect(() => {
        getContractDetails();
    }, [])

    return (
        <React.Fragment>
            <div className='action-block'>
                <Button size="small" variant="outlined" className="action-btn" onClick={() => openCheckList()} >
                    <ChecklistOutlinedIcon/>
                    <span style={{ marginLeft: '6px' }}>Checklist</span>
                </Button>
                {/* <Button size="small" variant="outlined" className="action-btn" onClick={() => deliveryCheckList()} >
                    <ChecklistOutlinedIcon/>
                    <span style={{ marginLeft: '6px' }}>Delivery Checklist</span>
                </Button>
                <Button size="small" variant="outlined" className="action-btn" onClick={() => collectionCheckList()} >
                    <ChecklistOutlinedIcon/>
                    <span style={{ marginLeft: '6px' }}>Collection Checklist</span>
                </Button> */}
                {/* <Button size='small' variant="outlined" className='action-btn' onClick={() => setManageContractDialog(true)}>
                    <SettingsOutlinedIcon />
                    <span style={{ marginLeft: '6px' }}>Manage Contract</span>
                </Button>    */}
                <Button size='small' variant="outlined" className='action-btn' onClick={() => navigateToManageContract()}>
                    <SettingsOutlinedIcon />
                    <span style={{ marginLeft: '6px' }}>Manage Contract</span>
                </Button>
                {contractVersion && contractVersion.length && contractVersion[0].isUpcomingPause && (
                    <Button size='small' variant="contained" className='action-btn' onClick={() => setDontPauseDialog(true)}>
                        <PauseCircleOutlinedIcon />
                        <span style={{ marginLeft: '6px' }}>Don't Pause</span>
                    </Button>
                )}
                {contractVersion && contractVersion.length && !contractVersion[0].isUpcomingPause && (
                    <Button size='small' variant="contained" className='action-btn' onClick={() => setPauseDialog(true)}>
                        <PauseCircleOutlinedIcon />
                        <span style={{ marginLeft: '6px' }}>Pause Subscription</span>
                    </Button>
                )}
                {tempContractDetails && tempContractDetails.contractEndDate === 'Unlimited' && (
                    <Button size='small' variant="contained" color="error" className='action-btn' onClick={() => setCancelDialog(true)}>
                        <CancelOutlinedIcon />
                        <span style={{ marginLeft: '6px' }}>Cancel Subscription</span>
                    </Button>
                )}
                {tempContractDetails && tempContractDetails.contractEndDate !== 'Unlimited' && (
                    <Button size='small' variant="contained" color="error" className='action-btn' onClick={() => setDontCancelDialog(true)}>
                        <CancelOutlinedIcon />
                        <span style={{ marginLeft: '6px' }}>Don't Cancel</span>
                    </Button>
                )}
                {/* Info Banner */}

            </div>
            {contractDetails.bannerStatus && (
                <InfoBanner message={contractDetails.bannerStatus} />
            )}

            {/* Customer Details Section */}
            <CustomerDetails details={tempContractDetails} />

            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <SectionWithTitle title={'Contract Versions'}>
                        <Grid item xs={12} style={{ marginTop: '10px' }}>
                            {contractVersion.map(contract => (
                                <Accordion
                                    key={contract.contractVersionId}
                                    expanded={(!expanded ? contract.status === 'Active' : expanded === contract.contractVersionId)}
                                    onChange={handleChange(contract.contractVersionId)}
                                >
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls={`${contract.contractVersionId}-content`}
                                        id={`${contract.contractVersionId}-header`}
                                    >
                                        <Typography>
                                            {`${contract.contractVersionNumber ? contract.contractVersionNumber : ''} - (${contract.startDate} - ${contract.endDate || ''})`}
                                        </Typography>
                                        {contract.headerStatus && contract.headerStatus !== 'Inactive' && (
                                            <span className='ml-10'>
                                                <Chip variant="outlined" label={contract.headerStatus} color={contract.headerStatus === 'Upcoming' ? 'warning' : 'success'} className={contract.headerStatus === 'Upcoming' ? 'chip-warning' : 'chip-success'} />
                                            </span>
                                        )}
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {/* Product Details */}
                                        {contract.contractVersion_BP && (
                                            <Grid item xs={12}>
                                                <Paper  className="contract-details" sx={{ p: 2}}>
                                                    <Products bpDetails={contract.contractVersion_BP} />
                                                </Paper>
                                            </Grid>
                                        )}

                                        {/* Plan Details */}
                                        {contract.contractVersion_Plan && (
                                            <Grid item xs={12}>
                                                <Paper className="contract-details" sx={{ p: 2 }}>
                                                    <Plan planDetails={contract.contractVersion_Plan} />
                                                </Paper>
                                            </Grid>
                                        )}
                                        {/* Experience Product Details */}
                                        {contract.contractVersion_EP && (
                                            <Grid item xs={12}>
                                                <Paper className="contract-details" sx={{ p: 2}}>
                                                    <ExpProduct expDetails={contract.contractVersion_EP} />
                                                </Paper>
                                            </Grid>
                                        )}

                                    </AccordionDetails>
                                </Accordion>
                            ))}

                        </Grid>
                    </SectionWithTitle>
                </Grid>


            </Grid>
            <DriverDetails driverDetails={driverDetails}/>

            <InvoiceDetails invoiceDetails={contractDetails.Invoices} />

            <OtherPaymentsDetails otherPayments={contractDetails.otherPayments}/>
            {openPauseDialog && (
                <PauseSubscriptionModal
                    open={openPauseDialog}
                    handleClose={closePauseDialog}
                    handleSubmit={pauseSubscription}
                />
            )}
            {openCancelDialog && (
                <CancelSubscriptionModal
                    open={openCancelDialog}
                    handleClose={closeCancelDialog}
                    showPauseModal={showPauseModal}
                    handleSubmit={cancelSubscription}
                />
            )}
            {openMangeContractDialog && (
                <UpcomingContractConfirm open={openMangeContractDialog} handleClose={closeManageContractDialog} handleSubmit={goToManageContract} />
                // <ManageContractModal
                //     open={openMangeContractDialog}
                //     contractVersionDetails={getActiveContractVersionDetails()}
                //     handleClose={closeManageContractDialog}
                //     handleSubmit={submitManageContract}
                // />
            )}
            {openDontPauseDialog && (
                <DontPauseModal 
                    open={openDontPauseDialog}
                    handleClose={closeDontPauseDialog}
                    handleSubmit={dontPauseSubscription}
                />
            )}
            {openDontCancelDialog && (
                <DontCancelModal
                    open={openDontPauseDialog}
                    handleClose={closeDontCancelDialog}
                    handleSubmit={dontCancelSubscription}
                />
            )}
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={snackBarConfig.openToast}
                onClose={onToastClose}
                key={vertical + horizontal}
                autoHideDuration={6000}
            >
                <Alert onClose={onToastClose} severity={'success'} sx={{ width: '100%' }}>
                    {toastMessage}
                </Alert>
            </Snackbar>
        </React.Fragment>
    )
}

export default UserDetails