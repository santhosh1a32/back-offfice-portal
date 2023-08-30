import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Products from './Products';
import Plan from './Plan';
import ManageExpProduct from './ManageExpProduct';
import AvailableProducts from './AvailableProducts';
import { getDataWithParam } from '../../DataService';
import { MANAGE_CONTRACT_DATA } from './mockData';

const AVAILABLE_PRODUCT_CONFIG = [
    {
        label: 'BP Name',
        fieldName: 'productName'
    },
    {
        label: 'Gross Amount',
        fieldName: 'grossAmount'
    },
    {
        label: 'Net Amount',
        fieldName: 'netAmount'
    },
    {
        label: 'Tax Amount',
        fieldName: 'taxAmount'
    }
];

const AVAILABLE_PLAN_CONFIG = [
    {
        label: 'Plan Name',
        fieldName: 'planName'
    },
    {
        label: 'Insurance Excess',
        fieldName: 'insuranceExcess'
    },
    {
        label: 'Included Mileage',
        fieldName: 'includedMileage'
    },
    {
        label: 'Gross Amount',
        fieldName: 'grossAmount'
    },
    {
        label: 'Net Amount',
        fieldName: 'netAmount'
    },
    {
        label: 'Tax Amount',
        fieldName: 'taxAmount'
    }
]

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const productDetails = {
    contractVersionBPNumber: '23456',
    productName: 'Tesla Modal Y',
    allocatedVehicle: [],
    priceAllocationType: 'Primary',
    grossAmount: 300,
    netAmount: 200,
    taxAmount: 60
}

const planDetails = [
    {
        "contractVersionPlanId": "40000674",
        "contractVersionPlanNumber": "667687",
        "planName": "Basic plan",
        "grossAmount": 200.00,
        "netAmount": 160.00,
        "taxAmount": 40.00,
        "includedMileage": 500,
        "insuranceExcess": 2000,
        "planLink": "https://abc-2c3-dev-ed--c.develop.vf.force.com/a1j5i000000Q2KzAAK"
    }
]

const ManageContractModal = ({ open, handleClose, handleSubmit, contractVersionDetails=[] }) => {
    const [value, setValue] = React.useState(0);
    const [currentSelectedData, setSelectedData] = React.useState(contractVersionDetails.length ? contractVersionDetails[0] : {});
    const [manageContractData, setManagaeContractData] = React.useState(MANAGE_CONTRACT_DATA);
    const [newSelection, setNewSelection] = React.useState({});
    let currentSelectedEp = [];
    if(currentSelectedData && currentSelectedData.contractVersion_EP && currentSelectedData.contractVersion_EP.length) {
        currentSelectedEp = currentSelectedData.contractVersion_EP.map(item => {
            return {
                ...item,
                experinceProductId: item.contractVersionEPId,
                name: item.experienceProductName,
                type: item.experienceProductType
            }
        })
    }

    const {
        availableProducts = [],
        availablePlans = [],
        availableExpProducts = []
    } = manageContractData;

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const newSelectionHandler = (data, type) => {
        if(type === 'BP') {
            let obj = {...newSelection, newProductId: data};
            setNewSelection(obj);
        }
        if(type === 'Plan') {
            let obj = {...newSelection, newPlanId: data};
            setNewSelection(obj);
        }
        if(type === 'Exp') {
            let obj = {...newSelection, newExperienceProductIdList: data.join()};
            setNewSelection(obj);
        }
    }

    React.useEffect(() => {
        
        if (window['BackOfficePortalCtrl'] && contractVersionDetails[0] && contractVersionDetails[0].contractVersionId) {
            var obj = { contractVersionId: contractVersionDetails[0].contractVersionId }
            getDataWithParam('BackOfficePortalCtrl', 'getDetailsForManageContract', JSON.stringify(obj)).then(result => {
                setManagaeContractData(result);
            })
        }
    }, [])
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth={true}
            maxWidth={'md'}
        >
            <DialogTitle sx={{ m: 0, p: 2 }}>
                Manage Contract
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
                    <DialogContentText>
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={value} onChange={handleChange} aria-label="Manage COntract tabs">
                                    <Tab label="Base Product" {...a11yProps(0)} />
                                    <Tab label="Plans" {...a11yProps(1)} />
                                    <Tab label="Experience Product" {...a11yProps(2)} />
                                </Tabs>
                            </Box>
                            <CustomTabPanel value={value} index={0}>
                                {currentSelectedData.contractVersion_BP && (
                                    <Products bpDetails={currentSelectedData.contractVersion_BP} title="Current Product" />
                                )}

                                <AvailableProducts 
                                    availableOptions={availableProducts} 
                                    config={AVAILABLE_PRODUCT_CONFIG}
                                    primaryField="productId"
                                    newSelectionId={newSelection.newProductId ? newSelection.newProductId : ''}
                                    onNewSelection={(data) => newSelectionHandler(data, 'BP')}
                                />
                            </CustomTabPanel>
                            <CustomTabPanel value={value} index={1}>
                                <Plan planDetails={currentSelectedData.contractVersion_Plan} />
                                <AvailableProducts 
                                    availableOptions={availablePlans} 
                                    config={AVAILABLE_PLAN_CONFIG}
                                    primaryField="planId"
                                    newSelectionId={newSelection.newPlanId ? newSelection.newPlanId : ''}
                                    onNewSelection={(data) => newSelectionHandler(data, 'Plan')}
                                />
                            </CustomTabPanel>
                            <CustomTabPanel value={value} index={2}>
                                <ManageExpProduct 
                                    availableExpProducts={availableExpProducts}
                                    currentSelectionDetails = {currentSelectedEp}
                                    newSelectionData={newSelection.newExperienceProductIdList ? newSelection.newExperienceProductIdList.split(',') : ''}
                                    onNewSelection={(data) => newSelectionHandler(data, 'Exp')}
                                />
                            </CustomTabPanel>
                        </Box>
                    </DialogContentText>
                </React.Fragment>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={() => handleSubmit(newSelection)}>Submit</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ManageContractModal;