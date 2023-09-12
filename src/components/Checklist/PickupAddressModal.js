import React, {useEffect, useState} from "react";
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
import CustomDatePicker from "../common/CustomDatePicker";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import dayjs from 'dayjs';
import { CHECKLIST } from "./checklistMockData";
import { getDataWithParam } from '../../DataService';

countries.registerLocale(enLocale);
const countriesObj = countries.getNames("en",{select:"official"});
const countriesArr = Object.entries(countriesObj).map(([key,value]) =>{
  return{
    label:value,
    value:key
  }
});

const pickupTime = [
  "08:00-09:00",
  "09:00-10:00",
  "10:00-11:00",
  "11:00-12:00",
  "12:00-13:00",
  "13:00-14:00",
  "14:00-15:00",
  "15:00-16:00",
  "16:00-17:00",
  "17:00-18:00",
  "18:00-19:00",
  "19:00-20:00",
  "20:00-21:00",
  "21:00-22:00"
];

export default function PickupAddressModal({open, handleClose, handleSubmit}){
   const [searchParams] = useSearchParams();
   const [pickupAddrValues, setpickupAddrValues] = useState(CHECKLIST.result);
  

   const handleInputChange = (e) => {
    console.log(e);
    const { name, value } =  e.target? e.target:e;
    setpickupAddrValues({
    ...pickupAddrValues,
    [name]: value,
    });
  };

  // const handlePickupInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setpickupAddrValues({
  //     ...pickupAddrValues,
  //     [name]: value,
  //   });
  // };

  const getCheckListItem = () =>{
    let obj = { contractId: searchParams.get("contractId"),checkListType:searchParams.get("checkListType"),contractCheckListId:searchParams.get("contractVersionId") }
    if (window['BackOfficePortalCtrl']) {
        getDataWithParam('BackOfficePortalCtrl', 'getPickupDetails', JSON.stringify(obj)).then(result => {
          setpickupAddrValues(result);
        })
    }
  }


  useEffect(() => {
    getCheckListItem();
  },[])

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
        <DialogContent className="pickup-form">
          <form>
            <DialogContentText className="header-text"> Pickup Address </DialogContentText>
            <div className="pickup">
            <CustomDatePicker className="pickup-date" label="Pickup Date" value={dayjs(pickupAddrValues.pickupDetails.pickupDate)} disablePast={false} onChangeHandler={handleInputChange} />  
            <FormControl sx={{ m: 2 }} variant="standard" className="select-pickup">
              <InputLabel id="demo-label">Pickup Time</InputLabel>
                <Select id="outlined-select-pickuptime" label="PickupTime"  name="PickupTime" defaultValue={pickupAddrValues.pickupDetails.pickupTime} onChange={handleInputChange}>
                {pickupTime.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
            </FormControl>
            </div>
            <FormControl sx={{ m: 2 }} variant="standard" className="select-country">
              <InputLabel id="demo-simple-select-label">Country</InputLabel>
                <Select id="outlined-select-country" label="Country"  name="countryIsoCode" defaultValue={pickupAddrValues.pickupAddress.countryIsoCode} onChange={handleInputChange}>
                {countriesArr.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            </FormControl>
            <TextField id="standard-city-input" name="city" label="City" type="text" variant="standard" defaultValue={pickupAddrValues.pickupAddress.city} onChange={handleInputChange} /> 
            <TextField id="standard-address-input" name="addressLine1" label="Address" className="input-text" type="text" variant="standard" defaultValue={pickupAddrValues.pickupAddress.addressLine1} onChange={handleInputChange}/>
            <TextField id="standard-state-input" name="state" label="State" type="text" variant="standard" defaultValue={pickupAddrValues.pickupAddress.state} onChange={handleInputChange}/>      
            <TextField id="standard-address2-input" name="addressLine2" label="Address Line 2" className="input-text" type="text" variant="standard" defaultValue={pickupAddrValues.pickupAddress.addressLine2} onChange={handleInputChange}/>
            <TextField id="standard-pincode-input" name="pincode" label="PinCode" type="number"  variant="standard"  defaultValue={pickupAddrValues.pickupAddress.postalCode} onChange={handleInputChange}/>
          </form>
        </DialogContent>
        <DialogActions className="confirm-btn">
          <Button onClick={()=>handleSubmit(pickupAddrValues)}>Submit</Button>
        </DialogActions>
      </Dialog>
  
      )
}