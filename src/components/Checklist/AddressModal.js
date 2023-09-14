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
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from '@mui/material/FormControlLabel';
import { getDataWithParam, saveDataWithParam } from '../../DataService';
import { CHECKLIST } from "./checklistMockData";
import CustomDatePicker from "../common/CustomDatePicker";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";

countries.registerLocale(enLocale);
const countriesObj = countries.getNames("en",{select:"official"});
const countriesArr = Object.entries(countriesObj).map(([key,value]) =>{
  return{
    label:value,
    value:key
  }
});

export default function AddressModal({open, contractCheckListId, handleClose, handleSubmit}){
  const [searchParams] = useSearchParams();
  const [formValues, setFormValues] = useState(CHECKLIST.addressDetails[0].homeAddress);
  const [billingAddrformValues, setbillingAddrFormValues] = useState(CHECKLIST.addressDetails[0].billingAddress);
  const[checked,setChecked] = useState(false);
  const handleChange = (e) =>{
    setChecked(e.target.checked);
    if(e.target.checked === true){
    setbillingAddrFormValues(
      formValues
    );
  }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  console.log(formValues);
  };

  const handleAddrInputChange = (e) => {
    const { name, value } = e.target;
    setbillingAddrFormValues({
      ...billingAddrformValues,
      [name]: value,
    });
    console.log(billingAddrformValues);
  };

  const getCheckListItem = () =>{
    let obj = { contractId: searchParams.get("contractId"),contractVersionId:searchParams.get("contractVersionId"),checkListType:searchParams.get("checkListType"),contractCheckListId:contractCheckListId }
    if (window['BackOfficePortalCtrl']) {
        getDataWithParam('BackOfficePortalCtrl', 'getHomeBillingAddress', JSON.stringify(obj)).then(result => {
          setFormValues(result.addressDetails[0].homeAddress);
          setbillingAddrFormValues(result.addressDetails[0].billingAddress);
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
      <DialogContent>
        <form>
          <DialogContentText className="header-text"> Home Address </DialogContentText>
          <div className="address">
          <FormControl sx={{ m:2}} variant="standard" className="select-country"  >
            <InputLabel id="demo-simple-select-label">Country</InputLabel>
              <Select id="outlined-select-country" label="Country" name="countryIsoCode" value={formValues.countryIsoCode} onChange={handleInputChange}>
              {countriesArr.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          </FormControl>
          <TextField id="standard-city-input" name="city" label="City" type="text"variant="standard" value={formValues.city} onChange={handleInputChange} /> 
          <TextField id="standard-address-input" name="addressLine1" label="Address" className="input-text" type="text" variant="standard" value={formValues.addressLine1} onChange={handleInputChange}/>
          <TextField id="standard-state-input" name="state" label="State" type="text" variant="standard" value={formValues.state} onChange={handleInputChange}/>      
          <TextField id="standard-address2-input" name="addressLine2" label="Address Line 2" className="input-text" type="text" variant="standard" value={formValues.addressLine2} onChange={handleInputChange}/>
          <TextField id="standard-pincode-input" name="postalCode" label="PinCode" type="number"  variant="standard"  value={formValues.postalCode} onChange={handleInputChange}/>
          </div>
          <DialogContentText className="header-text"> Billing Address </DialogContentText>
          <FormControlLabel required control={<Checkbox checked={checked} onChange={handleChange}/>} label="Same as Home Address" />
          { checked ? null : (<div className="address">
          <FormControl sx={{ m: 2}} variant="standard"  className="select-country">
            <InputLabel id="demo-simple-select-label">Country</InputLabel>
              <Select id="outlinedba-select-country" label="Country"  name="countryIsoCode" value={billingAddrformValues.countryIsoCode} onChange={handleAddrInputChange}>
              {countriesArr.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
            </FormControl>
          <TextField id="standardba-city-input" name="city" label="City" type="text" variant="standard" value={billingAddrformValues.city} onChange={handleAddrInputChange} /> 
          <TextField id="standardba-address-input" name="addressLine1" label="Address"  className="input-text" type="text" variant="standard" value={billingAddrformValues.addressLine1} onChange={handleAddrInputChange}/>
          <TextField id="standardba-state-input" name="state" label="State" type="text" variant="standard" value={billingAddrformValues.state} onChange={handleAddrInputChange}/>      
          <TextField id="standardba-address2-input" name="addressLine2" label="Address Line 2"  className="input-text" type="text" variant="standard" value={billingAddrformValues.addressLine2} onChange={handleAddrInputChange}/>
          <TextField id="standardba-pincode-input" name="postalCode" label="PinCode" type="number"  variant="standard"  value={billingAddrformValues.postalCode} onChange={handleAddrInputChange}/>
          </div>)}
        </form>
      </DialogContent>
      <DialogActions className="confirm-btn">
        <Button onClick={()=>handleSubmit(formValues,billingAddrformValues)}>Submit</Button>
      </DialogActions>
    </Dialog>
       );

}