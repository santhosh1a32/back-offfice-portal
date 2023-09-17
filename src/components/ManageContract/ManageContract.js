import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { MANAGE_CONTRACT_DATA } from '../UserDetails/mockData';
import { getDataWithParam, saveDataWithParam } from '../../DataService';
import Products from '../UserDetails/Products';
import AvailableProducts from '../UserDetails/AvailableProducts';
import Plan from '../UserDetails/Plan';
import ManageExpProduct from '../UserDetails/ManageExpProduct';
import { useSearchParams } from "react-router-dom";
import { Button } from '@mui/material';
import ConfirmContractModal from './ConfirmContractModal';
import dayjs from 'dayjs';

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

const ManageContract = ({ contractVersionDetails = [] }) => {
    const [value, setValue] = React.useState(0);
    const [currentSelectedData, setSelectedData] = React.useState(contractVersionDetails.length ? contractVersionDetails[0] : {});
    const [manageContractData, setManagaeContractData] = React.useState(MANAGE_CONTRACT_DATA);
    const [newSelection, setNewSelection] = React.useState({});
    const [searchParams] = useSearchParams();
    const [openConfirmModal, toggleConfirmModal] = React.useState(false);
    const [dataForModal, setDataForModal] = React.useState([]);
    const [expDataForModal, setExpDataForModal] = React.useState([]);
    let currentSelectedEp = [];
    if (currentSelectedData && currentSelectedData.contractVersion_EP && currentSelectedData.contractVersion_EP.length) {
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

    const setConfirmModalData = (data, type) => {
        let tempModalData = [...dataForModal];
        console.log('current data', manageContractData);
        if (type === 'BP') {
            // console.log(availableProducts);
            availableProducts.forEach(item => {
                if (item.productId === data) {
                    let obj = {
                        category: 'Base Product',
                        oldValue: manageContractData.selectedProduct.productName,
                        newValue: item.productName,
                        oldPrice: manageContractData.selectedProduct.netAmount,
                        newPrice: item.netAmount,
                        effectiveFrom: ''
                    }
                    if (tempModalData.length) {
                        let index = null;
                        tempModalData.forEach((item, i) => {
                            if (item.category === 'Base Product') {
                                index = i;
                            }
                        })
                        if (index !== null) {
                            tempModalData[index] = obj;
                        } else {
                            tempModalData.push(obj)
                            setDataForModal(tempModalData);
                        }
                    } else {
                        tempModalData.push(obj)
                        setDataForModal(tempModalData);
                    }
                }
            })
        }
        if (type === 'Plan') {
            console.log(availablePlans);
            availablePlans.forEach(item => {
                if (item.planId === data) {
                    let obj = {
                        category: 'Base Plan',
                        oldValue: manageContractData.selectedPlan[0].planName,
                        newValue: item.planName,
                        oldPrice: manageContractData.selectedPlan[0].netAmount,
                        newPrice: item.netAmount,
                        effectiveFrom: 'Today'
                    }
                    if (tempModalData.length) {
                        let index = null;
                        tempModalData.forEach((item, i) => {
                            if (item.category === 'Base Plan') {
                                index = i;
                            }
                        })
                        if (index !== null) {
                            tempModalData[index] = obj;
                        } else {
                            tempModalData.push(obj)
                            setDataForModal(tempModalData);
                        }
                    } else {
                        tempModalData.push(obj)
                        setDataForModal(tempModalData);
                    }
                }
            })
        }
        if (type === 'Exp') {
            console.log(availableExpProducts, data, manageContractData.selectedExpProduct);
            const iterations = data.length > manageContractData.selectedExpProduct.length ? data.length : manageContractData.selectedExpProduct.length;
            const tempArr = [];
            const selectedOptions = [];
            let experienceProductPriceTotal = 0;
            availableExpProducts.forEach(item => {
                if(data.includes(item.experienceProductId)){
                    let experienceProduct = {}
                    experienceProductPriceTotal += item.netAmount;
                    experienceProduct["experienceProductName"] = item.experienceProductName;
                    experienceProduct["experienceProductPrice"] = item.netAmount;
                    experienceProduct["experienceProductPriceTotal"] = experienceProductPriceTotal;
                    selectedOptions.push(experienceProduct);
                }
            })
            // let obj = {
            //     category: 'Experience Product',
            //     oldValue: '',
            //     newValue: '',
            //     effectiveFrom: 'Today'
            // }
            // let oldValStr = '';
            // let newValStr = '';
            let experienceProductOldPriceTotal = 0;
            for(let i=0; i<iterations ; i++) {
                // if(!oldValStr && oldValStr.props) {
                //     if(manageContractData.selectedExpProduct[i] && manageContractData.selectedExpProduct[i].experienceProductName) {
                //         oldValStr = <span>{manageContractData.selectedExpProduct[i].experienceProductName}</span>
                //     }
                // }else {
                //     if(manageContractData.selectedExpProduct[i] && manageContractData.selectedExpProduct[i].experienceProductName) {
                //         let tempStr = <><br/><span>{manageContractData.selectedExpProduct[i].experienceProductName}</span></>
                //         oldValStr += tempStr;
                //     }
                // }

                // if(!newValStr && newValStr.props) {
                //     if(selectedOptions[i]) {
                //         newValStr = <span>{selectedOptions[i]}</span>
                //     }
                // }else {
                //     let tempStr = <><br/><span>{selectedOptions[i]}</span></>
                //     newValStr += tempStr;
                // }
                console.log(manageContractData.selectedExpProduct[i]);
                experienceProductOldPriceTotal = manageContractData.selectedExpProduct[i]?manageContractData.selectedExpProduct[i].netAmount:'';
                let obj = {
                    category: i === 0 ? 'Experience Product' : '',
                    oldValue: manageContractData.selectedExpProduct[i] && manageContractData.selectedExpProduct[i].experienceProductName ? manageContractData.selectedExpProduct[i].experienceProductName : '',
                    newValue: selectedOptions[i] ? selectedOptions[i].experienceProductName : '',
                    newPrice: selectedOptions[i] ? selectedOptions[i].experienceProductPriceTotal: '',
                    oldPrice: manageContractData.selectedExpProduct[i] && manageContractData.selectedExpProduct[i].experienceProductName ? 
                    experienceProductOldPriceTotal :'',
                    effectiveFrom: i === 0 ? 'Today' : ''
                }
                tempArr.push(obj);
            }
            // obj.oldValue = oldValStr;
            // obj.newValue = newValStr;
            // tempArr.push(obj);
            setExpDataForModal(tempArr)
            // availableExpProducts.forEach((item, index) => {
            //     if (item.planId === data) {
            //         let obj = {
            //             category: index === 0 ? 'Experience Product' : "",
            //             oldValue: manageContractData.selectedPlan[0].planName,
            //             newValue: item.planName,
            //             effectiveFrom: 'Today'
            //         }
            //         if (tempModalData.length) {
            //             let index = null;
            //             tempModalData.forEach((item, i) => {
            //                 if (item.category === 'Base Plan') {
            //                     index = i;
            //                 }
            //             })
            //             if (index !== null) {
            //                 tempModalData[index] = obj;
            //             } else {
            //                 tempModalData.push(obj)
            //                 setDataForModal(tempModalData);
            //             }
            //         } else {
            //             tempModalData.push(obj)
            //             setDataForModal(tempModalData);
            //         }
            //     }
            // })
        }
        console.log('temp data here', tempModalData)
    }

    const newSelectionHandler = (data, type) => {
        if (type === 'BP') {
            let obj = { ...newSelection, newProductId: data };
            setNewSelection(obj);
        }
        if (type === 'Plan') {
            let obj = { ...newSelection, newPlanId: data };
            setNewSelection(obj);
        }
        if (type === 'Exp') {
            let obj = { ...newSelection, newExperienceProductIdList: data.join() };
            setNewSelection(obj);
        }
        setConfirmModalData(data, type);
    }

    const submitChanges = () => {
        console.log('data submitted', newSelection);
        toggleConfirmModal(true);
    }

    const closeConfirmModal = () => {
        toggleConfirmModal(false);
    }

    const getDetailsForManageContract = () => {
        if (window['BackOfficePortalCtrl'] && searchParams.get("contractVersionId")) {
            var obj = { contractVersionId: searchParams.get("contractVersionId") }
            getDataWithParam('BackOfficePortalCtrl', 'getDetailsForManageContract', JSON.stringify(obj)).then(result => {
                console.log('managae contract details', result);
                setManagaeContractData(result);
            })
        }
    }

    const changeContract = (obj) => {
        if (window['BackOfficePortalCtrl']) {
            saveDataWithParam('BackOfficePortalCtrl', 'contractChangeRequest', JSON.stringify(obj)).then(result => {
                if (result && result.status === 'Success') {
                    getDetailsForManageContract();
                } else {
                    console.log('error')
                }
                if(openConfirmModal) {
                    closeConfirmModal();
                }
            })
        }
    }

    const submitManageContract = (data) => {
        const obj = {
            ...newSelection,
            contractChangeRequestType: 'Manage Contract', 
            contractId: searchParams.get("contractId"), //mandatory
            contractVersionId: searchParams.get("contractVersionId"), //mandatory
            newVersionStartDate: data ? dayjs(data).format('YYYY-MM-DD') : dayjs(new Date()).format('YYYY-MM-DD'),
            comments: ""
        }
        console.log(obj);
        changeContract(obj);
    }

    React.useEffect(() => {
        getDetailsForManageContract();
    }, [])
    return (
        <React.Fragment>
            <div>
                <Button size="small" variant="outlined" className="action-btn" onClick={() => submitChanges()} >
                    <span style={{ marginLeft: '6px' }}>Submit Changes</span>
                </Button>
            </div>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="Manage COntract tabs">
                        <Tab label="Base Product" {...a11yProps(0)} />
                        <Tab label="Plans" {...a11yProps(1)} />
                        <Tab label="Experience Product" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    {manageContractData.selectedProduct && manageContractData.selectedProduct.productId && (
                        <Products bpDetails={manageContractData.selectedProduct} title="Current Product" />
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
                    <Plan planDetails={manageContractData.selectedPlan} />
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
                        currentSelectionDetails={manageContractData.selectedExpProduct}
                        newSelectionData={newSelection.newExperienceProductIdList ? newSelection.newExperienceProductIdList.split(',') : ''}
                        onNewSelection={(data) => newSelectionHandler(data, 'Exp')}
                    />
                </CustomTabPanel>
            </Box>
            {openConfirmModal && (
                <ConfirmContractModal 
                    open={openConfirmModal} 
                    handleClose={closeConfirmModal}
                    newData={dataForModal}
                    expDataForModal={expDataForModal}
                    handleSubmit={submitManageContract} 
                />
            )}
        </React.Fragment>
    )
}

export default ManageContract;