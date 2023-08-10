import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import './userDetails.scss';
import Plan from './Plan';
import ExpProduct from './ExpProduct';
import Products from './Products';
import CustomerDetails from './CustomerDetails';
import SectionWithTitle from '../common/SectionWithTitle';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CONTRACT_DETAILS } from './mockData';
import Chip from '@mui/material/Chip';
import { getDataWithParam } from '../../DataService';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@mui/material';
import PauseSubscriptionModal from './PauseSubscriptionModal';
import CancelSubscriptionModal from './CancelSubscriptionModal';


const UserDetails = () => {
    const [expanded, setExpanded] = React.useState();
    const [contractDetails, updateContractDetails] = React.useState(CONTRACT_DETAILS);
    const [searchParams] = useSearchParams();
    const [openPauseDialog, setPauseDialog] = React.useState(false);
    const [openCancelDialog, setCancelDialog] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const closePauseDialog = () => {
        setPauseDialog(false);
    }

    const closeCancelDialog = () => {
        setCancelDialog(false);
    }

    const showPauseModal = () => {
        closeCancelDialog();
        setPauseDialog(true);
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
        email: contractDetails.email
    }

    React.useEffect(() => {
        var obj = { contractId: searchParams.get("contractId") }
        if (window['BackOfficePortalCtrl']) {
            getDataWithParam('BackOfficePortalCtrl', 'getContractDetails', JSON.stringify(obj)).then(result => {
                console.log(result);
                updateContractDetails(result);
            })
        }
    }, [searchParams])

    return (
        <React.Fragment>
            <div className='action-block'>
                <Button size='small' variant="contained" className='action-btn' onClick={() => setPauseDialog(true)}>
                    Pause Subscription
                </Button>
                <Button size='small' variant="contained" color="error" className='action-btn' onClick={() => setCancelDialog(true)}>
                    Cancel Subscription
                </Button>
            </div>

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
                                            {`${contract.contractVersionId} - (${contract.startDate} - ${contract.endDate})`}
                                        </Typography>
                                        {contract.status && contract.status === 'Active' && (
                                            <span className='ml-10'><Chip label="Active" color="primary" variant="outlined" /></span>
                                        )}
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {/* Product Details */}
                                        <Grid item xs={12}>
                                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                                <Products bpDetails={contract.contractVersion_BP} />
                                            </Paper>
                                        </Grid>
                                        {/* Plan Details */}
                                        <Grid item xs={12}>
                                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                                <Plan planDetails={contract.contractVersion_Plan} />
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                                <ExpProduct expDetails={contract.contractVersion_EP} />
                                            </Paper>
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>
                            ))}

                        </Grid>
                    </SectionWithTitle>
                </Grid>


            </Grid>
            
            {openPauseDialog && (
                <PauseSubscriptionModal 
                    open={openPauseDialog}
                    handleClose={closePauseDialog}
                />
            )}
            {openCancelDialog && (
                <CancelSubscriptionModal
                    open={openCancelDialog}
                    handleClose={closeCancelDialog}
                    showPauseModal={showPauseModal}
                />
            )}
        </React.Fragment>
    )
}

export default UserDetails