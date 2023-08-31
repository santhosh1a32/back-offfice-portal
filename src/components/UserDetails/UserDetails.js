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
import ManageContractModal from './ManageContractModal';
import InfoBanner from '../common/InfoBanner/InfoBanner';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PauseCircleOutlinedIcon from '@mui/icons-material/PauseCircleOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';

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
    const [openMangeContractDialog, setManageContractDialog] = React.useState(false);
    const [snackBarConfig, setSnackbarConfig] = React.useState({
        openToast: false,
        vertical: 'top',
        horizontal: 'right',
        severity: '',
        toastMessage: ''
    });
    const navigate = useNavigate();

    const openCheckList = () =>{
        navigate({ pathname:"/checkList", search:createSearchParams({ contractId:"a1A5i000000rrcS", contractVersionId:"80000328", checkListType:"Pickup" }).toString()})
    }

    const deliveryCheckList = () =>{
        navigate({ pathname:"/checkList", search:createSearchParams({ contractId:"a1A5i000000rrcS", contractVersionId:"80000328", checkListType:"Delivery" }).toString()})
    }

    const collectionCheckList = () =>{
        navigate({ pathname:"/checkList", search:createSearchParams({ contractId:"a1A5i000000rrcS", contractVersionId:"80000328", checkListType:"Collection" }).toString()})
    }

    const { openToast, vertical, horizontal, severity, toastMessage } = snackBarConfig;

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const closePauseDialog = () => {
        setPauseDialog(false);
    }

    const closeCancelDialog = () => {
        setCancelDialog(false);
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
                if (openCancelDialog) {
                    closeCancelDialog();
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
        changeContract(obj);
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

    React.useEffect(() => {
        getContractDetails();
    }, [])

    return (
        <React.Fragment>
            <div className='action-block'>
                <Button size="small" variant="outlined" className="action-btn" onClick={() => openCheckList()} >
                    <ChecklistOutlinedIcon/>
                    <span style={{ marginLeft: '6px' }}>Pickup Checklist</span>
                </Button>
                <Button size="small" variant="outlined" className="action-btn" onClick={() => deliveryCheckList()} >
                    <ChecklistOutlinedIcon/>
                    <span style={{ marginLeft: '6px' }}>Delivery Checklist</span>
                </Button>
                <Button size="small" variant="outlined" className="action-btn" onClick={() => collectionCheckList()} >
                    <ChecklistOutlinedIcon/>
                    <span style={{ marginLeft: '6px' }}>Collection Checklist</span>
                </Button>
                <Button size='small' variant="outlined" className='action-btn' onClick={() => setManageContractDialog(true)}>
                    <SettingsOutlinedIcon />
                    <span style={{ marginLeft: '6px' }}>Manage Contract</span>
                </Button>   
                <Button size='small' variant="contained" className='action-btn' onClick={() => setPauseDialog(true)}>
                    <PauseCircleOutlinedIcon />
                    <span style={{ marginLeft: '6px' }}>Pause Subscription</span>
                </Button>
                <Button size='small' variant="contained" color="error" className='action-btn' onClick={() => setCancelDialog(true)}>
                    <CancelOutlinedIcon />
                    <span style={{ marginLeft: '6px' }}>Cancel Subscription</span>
                </Button>
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
                                            <span className='ml-10'><Chip label={contract.headerStatus} color={contract.headerStatus === 'Upcoming' ? 'warning' : 'success'} /></span>
                                        )}
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {/* Product Details */}
                                        {contract.contractVersion_BP && (
                                            <Grid item xs={12}>
                                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                                    <Products bpDetails={contract.contractVersion_BP} />
                                                </Paper>
                                            </Grid>
                                        )}

                                        {/* Plan Details */}
                                        {contract.contractVersion_Plan && (
                                            <Grid item xs={12}>
                                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                                    <Plan planDetails={contract.contractVersion_Plan} />
                                                </Paper>
                                            </Grid>
                                        )}
                                        {/* Experience Product Details */}
                                        {contract.contractVersion_EP && (
                                            <Grid item xs={12}>
                                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
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
            <DriverDetails />

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
                <ManageContractModal
                    open={openMangeContractDialog}
                    contractVersionDetails={getActiveContractVersionDetails()}
                    handleClose={closeManageContractDialog}
                    handleSubmit={submitManageContract}
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