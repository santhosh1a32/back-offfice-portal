import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from '@mui/material/DialogContentText';
import TextField from "@mui/material/TextField";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from '@mui/material/FormControlLabel';
import { getDataWithParam, saveDataWithParam } from '../../DataService';
import { CHECKLIST } from "./checklistMockData";
import CustomDatePicker from "../common/CustomDatePicker";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json"
import MileageCaptureModal from "./MileageCaptureModal";
import VehicleAllocationModal from './VehicleAllocationModal';
import DrivingLicenseModal from "./DrivingLicenseModal";
import dayjs from "dayjs";

countries.registerLocale(enLocale);
const countriesObj = countries.getNames("en", { select: "official" });
const countriesArr = Object.entries(countriesObj).map(([key, value]) => {
  return {
    label: value,
    value: key
  }
});

export default function CheckListModal({
  contractCheckListId = '',
  relatedRecordId,
  type,
  open,
  handleClose,
  handleSubmit
}) {
  const [searchParams] = useSearchParams();
  const [formValues, setFormValues] = useState(CHECKLIST.addressDetails[0].homeAddress);
  const [billingAddrformValues, setbillingAddrFormValues] = useState(CHECKLIST.addressDetails[0].billingAddress);
  const [pickupAddrValues, setpickupAddrValues] = useState(CHECKLIST.result);
  const [checked, setChecked] = useState(false);
  const [vehicleDetails, setVehicleDetails] = React.useState();
  const [mileageDetails, setMileageDetails] = React.useState();
  const [drivingLicenseDetails, setDrivingLicenseDetails] = React.useState([]);

  const checkListType = searchParams.get("checkListType");

  const handleChange = (e) => {
    setChecked(e.target.checked);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    // console.log(formValues);
  };

  const handleAddrInputChange = (e) => {
    const { name, value } = e.target;
    setbillingAddrFormValues({
      ...billingAddrformValues,
      [name]: value,
    });
    //console.log(billingAddrformValues);
  };

  const confirmVehicleAllocation = (id) => {
    let reqObj = {
      contractId: searchParams.get("contractId"),
      contractVersionId: searchParams.get("contractVersionId"),
      checkListType: searchParams.get("checkListType"),
      contractCheckListId,
      vehicleId: id
    }
    saveDataWithParam('BackOfficePortalCtrl', 'confirmVehicleAllocation', JSON.stringify(reqObj)).then(result => {
      console.log(result);
      if (result && result.status === 'Success') {
        handleClose();
      }
    })
  }

  const submitMileage = (mileage, fuelLevel, type) => {
    let reqObj = {
      contractId: searchParams.get("contractId"),
      contractVersionId: searchParams.get("contractVersionId"),
      checkListType: searchParams.get("checkListType"),
      contractCheckListId,
    }
    if (relatedRecordId) {
      reqObj.relatedRecordId = relatedRecordId;
    }
    if (type === 'start') {
      reqObj.startFuelLevel = fuelLevel.toString();
      reqObj.startMileage = mileage.toString();
    } else {
      reqObj.returnFuelLevel = fuelLevel.toString();
      reqObj.returnMileage = mileage.toString();
    }
    saveDataWithParam('BackOfficePortalCtrl', 'updateMileageAndFuel', JSON.stringify(reqObj)).then(result => {
      console.log(result);
      if (result && result.status === 'Success') {
        handleClose();
      }
    })
  }

  const getDrivingLicense = () => {
    let reqObj = {
      contractId: searchParams.get("contractId"),
      contractVersionId: searchParams.get("contractVersionId"),
      checkListType: searchParams.get("checkListType"),
      contractCheckListId,
    }
    getDataWithParam('BackOfficePortalCtrl', 'getDrivingLicense', JSON.stringify(reqObj)).then(result => {
      if (result && result.drivingLicenseDetails) {
        setDrivingLicenseDetails(result.drivingLicenseDetails)
      }
    })
  }

  const updateChecklistRequest = (obj, status = null) => {
    const tempObj = {
      ...obj,
      contractId: searchParams.get("contractId"),
      contractVersionId: searchParams.get("contractVersionId"),
      checkListType: searchParams.get("checkListType"),
      contractCheckListId,
    }
    if (relatedRecordId) {
      tempObj.relatedRecordId = relatedRecordId;
    }
    console.log('update req', tempObj);
    saveDataWithParam('BackOfficePortalCtrl', 'updateChecklistRequest', JSON.stringify(tempObj)).then(result => {
      console.log(result);
      if (result && result.status === 'Success' && !status) {
        handleClose();
      }
      if (status) {
        getDrivingLicense()
      }
    })
  }

  const updateTaskStatus = () => {
    updateChecklistRequest({
      taskStatus: 'Verified',
      jsonData: {
        drivingLicenseDetails: drivingLicenseDetails
      }
    })
  }

  const updateAddress = (formValues, billingAddrformValues) => {
    updateChecklistRequest({
      taskStatus: 'Verified',
      jsonData: {
        addressDetails: [{
          homeAddress: formValues,
          billingAddress: billingAddrformValues
        }]
      }
    })
  }

  const updateDateAndPickUpAddress = (e, dateName) => {
    console.log(e);
    const obj = {...pickupAddrValues};
    if(dateName) {
      obj.pickupDetails.pickupDate = e;
    }else if(e.target.name === 'pickupTime') {
      obj.pickupDetails.pickupTime = e.target.value;
    }else {
      obj.pickupAddress[e.target.name] = e.target.value;
    }
    setpickupAddrValues(obj);
  }

  const submitPickuPAddress = () => {
    updateChecklistRequest({
      taskStatus: 'Verified',
      jsonData: {
        ...pickupAddrValues
      }
    })
  }

  useEffect(() => {
    console.log('id here', contractCheckListId)
    var obj = { contractId: searchParams.get("contractId"), contractVersionId: searchParams.get("contractVersionId"), checkListType: searchParams.get("checkListType") }
    if (window['BackOfficePortalCtrl']) {
      // let reqObj = {...obj};
      // if(relatedRecordId) {
      //   reqObj.relatedRecordId = relatedRecordId;
      // }
      // getDataWithParam('BackOfficePortalCtrl', 'returnCheckListDetails', JSON.stringify(reqObj)).then(result => {
      //   console.log(result);
      // })
      if (type === 'Vehicle Allocation') {
        let reqObj = {
          ...obj,
          contractCheckListId,
        }
        if (relatedRecordId) {
          reqObj.relatedRecordId = relatedRecordId;
        }
        getDataWithParam('BackOfficePortalCtrl', 'getAvailableVehicles', JSON.stringify(reqObj)).then(result => {
          console.log(result);
          setVehicleDetails(result.VehicleDetails || []);
        })
      }
      if (type === 'Driving License') {
        getDrivingLicense()
      }
      if (type === 'Fuel & Mileage' && relatedRecordId) {
        let reqObj = {
          ...obj,
          contractCheckListId,
          relatedRecordId
        }
        getDataWithParam('BackOfficePortalCtrl', 'returnMileageAndFuel', JSON.stringify(reqObj)).then(result => {
          console.log(result);
          if (result && result.MileageAndFuelDetails) {
            let obj = {
              mileage: checkListType === 'Delivery' ? result.MileageAndFuelDetails.startMileage : result.MileageAndFuelDetails.returnMileage,
              fuelLevel: checkListType === 'Delivery' ? result.MileageAndFuelDetails.startFuel : result.MileageAndFuelDetails.returnFuel
            }
            setMileageDetails(obj);
          }
        })
      }
      if (type === 'Address') {
        let reqObj = {
          ...obj,
          contractCheckListId
        }
        getDataWithParam('BackOfficePortalCtrl', 'getHomeBillingAddress', JSON.stringify(reqObj)).then(result => {
          console.log(result);
          if (result && result.addressDetails && result.addressDetails.length) {
            setFormValues(result.addressDetails[0].homeAddress);
            setbillingAddrFormValues(result.addressDetails[0].billingAddress);
          }
        })
      }
      if (type === 'Date Time;Address') {
        let reqObj = {
          ...obj,
          contractCheckListId
        }
        getDataWithParam('BackOfficePortalCtrl', 'getPickupDetails', JSON.stringify(reqObj)).then(result => {
          console.log(result);
          if (result) {
            setpickupAddrValues(result);
          }
        })
      }
    }
  }, [])

  if (type === 'Fuel & Mileage' && checkListType === 'Delivery') {
    return (
      <MileageCaptureModal
        open={open}
        handleClose={handleClose}
        handleSubmit={submitMileage}
        mileageLabel='Start Mileage'
        fuelLevelLabel='Start Fuel Level'
        type='start'
        mileageData={mileageDetails}
      />
    )
  }
  if (type === 'Fuel & Mileage' && checkListType === 'Collection') {
    return (
      <MileageCaptureModal
        open={open}
        handleClose={handleClose}
        handleSubmit={submitMileage}
        mileageLabel='Return Mileage'
        fuelLevelLabel='Return Fuel Level'
        type='return'
        mileageData={mileageDetails}
      />
    )
  }
  if (type === 'Vehicle Allocation') {
    return (
      <VehicleAllocationModal
        vehicleDetails={vehicleDetails}
        open={open}
        handleClose={handleClose}
        handleSubmit={confirmVehicleAllocation}
      />
    )
  }

  if (type === 'Driving License') {
    return (
      <DrivingLicenseModal
        open={open}
        drivingLicenseDetails={drivingLicenseDetails}
        handleClose={handleClose}
        handleSubmit={updateChecklistRequest}
        updateTaskStatus={updateTaskStatus}
      />
    )
  }
  if (type === "Address") {
    return (
      <Dialog open={open} onClose={handleClose} className="form-modal">
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
        <DialogContent>
          <form>
            <DialogContentText className="header-text"> Home Address </DialogContentText>
            <div className="address">
              <FormControl sx={{ m: 2 }} variant="standard" className="select-country"  >
                <InputLabel id="demo-simple-select-label">Country</InputLabel>
                <Select id="outlined-select-country" label="Country" name="countryIsoCode" value={formValues.countryIsoCode} onChange={handleInputChange}>
                  {countriesArr.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField id="standard-city-input" name="city" label="City" type="text" variant="standard" value={formValues.city} onChange={handleInputChange} />
              <TextField id="standard-address-input" name="addressLine1" label="Address" className="input-text" type="text" variant="standard" value={formValues.addressLine1} onChange={handleInputChange} />
              <TextField id="standard-state-input" name="state" label="State" type="text" variant="standard" value={formValues.state} onChange={handleInputChange} />
              <TextField id="standard-address2-input" name="addressLine2" label="Address Line 2" className="input-text" type="text" variant="standard" value={formValues.addressLine2} onChange={handleInputChange} />
              <TextField id="standard-pincode-input" name="pincode" label="PinCode" type="number" variant="standard" value={formValues.postalCode} onChange={handleInputChange} />
            </div>
            <DialogContentText className="header-text"> Billing Address </DialogContentText>
            <FormControlLabel required control={<Checkbox checked={checked} onChange={handleChange} />} label="Same as Home Address" />
            {checked ? null : (<div className="address">
              <FormControl sx={{ m: 2 }} variant="standard" className="select-country">
                <InputLabel id="demo-simple-select-label">Country</InputLabel>
                <Select id="outlinedba-select-country" label="Country" name="country" value={billingAddrformValues.countryIsoCode} onChange={handleAddrInputChange}>
                  {countriesArr.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField id="standardba-city-input" name="city" label="City" type="text" variant="standard" value={billingAddrformValues.city} onChange={handleAddrInputChange} />
              <TextField id="standardba-address-input" name="address" label="Address" className="input-text" type="text" variant="standard" value={billingAddrformValues.addressLine1} onChange={handleAddrInputChange} />
              <TextField id="standardba-state-input" name="state" label="State" type="text" variant="standard" value={billingAddrformValues.state} onChange={handleAddrInputChange} />
              <TextField id="standardba-address2-input" name="addressLine1" label="Address Line 2" className="input-text" type="text" variant="standard" value={billingAddrformValues.addressLine2} onChange={handleAddrInputChange} />
              <TextField id="standardba-pincode-input" name="pincode" label="PinCode" type="number" variant="standard" value={billingAddrformValues.postalCode} onChange={handleAddrInputChange} />
            </div>)}
          </form>
        </DialogContent>
        <DialogActions className="confirm-btn">
          <Button onClick={() => updateAddress(formValues, billingAddrformValues)}>Submit</Button>
        </DialogActions>
      </Dialog>
    );
  }
  else {
    return (
      <Dialog open={open} onClose={handleClose} className="form-modal">
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
        <DialogContent>
          <form>
            <DialogContentText className="header-text"> Pickup Address </DialogContentText>
            <div className="pickup">
              <CustomDatePicker className="pickup-date" label="Pickup Date" value={dayjs(pickupAddrValues.pickupDetails.pickupDate)} disablePast={true} onChangeHandler={(val)=>updateDateAndPickUpAddress(val,'pickupDate')}/>
              <TextField id="standard-pickup-time" name="pickupTime" label="Pickup Time" type="text" variant="standard" value={pickupAddrValues.pickupDetails.pickupTime} onChange={updateDateAndPickUpAddress} />
            </div>
            <FormControl sx={{ m: 2 }} variant="standard" className="select-country">
              <InputLabel id="demo-simple-select-label">Country</InputLabel>
              <Select id="outlined-select-country" label="Country" name="countryIsoCode" value={pickupAddrValues.pickupAddress.countryIsoCode} onChange={updateDateAndPickUpAddress}>
                {countriesArr.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField id="standard-city-input" name="city" label="City" type="text" variant="standard" value={pickupAddrValues.pickupAddress.city} onChange={updateDateAndPickUpAddress} />
            <TextField id="standard-address-input" name="addressLine1" label="Address" className="input-text" type="text" variant="standard" value={pickupAddrValues.pickupAddress.addressLine1} onChange={updateDateAndPickUpAddress} />
            <TextField id="standard-state-input" name="state" label="State" type="text" variant="standard" value={pickupAddrValues.pickupAddress.state} onChange={updateDateAndPickUpAddress} />
            <TextField id="standard-address2-input" name="addressLine2" label="Address Line 2" className="input-text" type="text" variant="standard" value={pickupAddrValues.pickupAddress.addressLine2} onChange={updateDateAndPickUpAddress} />
            <TextField id="standard-pincode-input" name="postalCode" label="PinCode" type="number" variant="standard" value={pickupAddrValues.pickupAddress.postalCode} onChange={updateDateAndPickUpAddress} />
          </form>
        </DialogContent>
        <DialogActions className="confirm-btn">
          <Button onClick={submitPickuPAddress}>Submit</Button>
        </DialogActions>
      </Dialog>
    )
  }
}
