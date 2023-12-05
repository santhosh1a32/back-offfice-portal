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
import { Add } from "@mui/icons-material";

countries.registerLocale(enLocale);
const countriesObj = countries.getNames("en",{select:"official"});
const countriesArr = Object.entries(countriesObj).map(([key,value]) =>{
  return{
    label:value,
    value:key
  }
});

function AddressModal({open, handleClose, contractContactDetails, onSubmit}){
  const [searchParams] = useSearchParams();
  const [formValues, setFormValues] = useState({
    addressLine1:'',
    addressLine2:'',
    state:'',
    city:'',
    country:'',
    postalCode:''
  })
  const [billingAddrformValues, setbillingAddrFormValues] = useState({ 
    addressLine1:'',
    addressLine2:'',
    state:'',
    city:'',
    country:'',
    postalCode:''
  });
  const[checked,setChecked] = useState(false);
  // const handleChange = (e) =>{
  //   setChecked(e.target.checked);
  //   if(e.target.checked === true){
  //   setbillingAddrFormValues(
  //     formValues
  //   );
  // }
  // }

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormValues({
  //     ...formValues,
  //     [name]: value,
  //   });
  // console.log(formValues);
  // };

  // const handleAddrInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setbillingAddrFormValues({
  //     ...billingAddrformValues,
  //     [name]: value,
  //   });
  //   console.log(billingAddrformValues);
  // };

  // const getCheckListItem = () =>{
  //   let obj = { contractId: searchParams.get("contractId"),contractVersionId:searchParams.get("contractVersionId"),checkListType:searchParams.get("checkListType"),contractCheckListId:contractCheckListId }
  //   if (window['BackOfficePortalCtrl']) {
  //       getDataWithParam('BackOfficePortalCtrl', 'getHomeBillingAddress', JSON.stringify(obj)).then(result => {
  //         setFormValues(result.addressDetails[0].homeAddress);
  //         setbillingAddrFormValues(result.addressDetails[0].billingAddress);
  //       })
  //   }
  // }

   useEffect(() => {
        if(contractContactDetails[0].contactHomeAddress){
          let contactHomeAddress = contractContactDetails[0].contactHomeAddress.split(',');
        }
        if(contractContactDetails[0].contactHomeAddress){
          let billingAddrformValues = contractContactDetails[0].billingAddrformValues.split(',');
        }
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
              <Select id="outlined-select-country" label="Country" name="countryIsoCode" >
              {countriesArr.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          </FormControl>
          <TextField id="standard-city-input" name="city" label="City" type="text"variant="standard" /> 
          <TextField id="standard-address-input" name="addressLine1" label="Address" className="input-text" type="text" variant="standard"/>
          <TextField id="standard-state-input" name="state" label="State" type="text" variant="standard"/>      
          <TextField id="standard-address2-input" name="addressLine2" label="Address Line 2" className="input-text" type="text" variant="standard" />
          <TextField id="standard-pincode-input" name="postalCode" label="PinCode" type="number"  variant="standard" />
          </div>
          <DialogContentText className="header-text"> Billing Address </DialogContentText>
          <FormControlLabel required label="Same as Home Address" />
          <div className="address">
          <FormControl sx={{ m: 2}} variant="standard"  className="select-country">
            <InputLabel id="demo-simple-select-label">Country</InputLabel>
              <Select id="outlinedba-select-country" label="Country"  name="countryIsoCode">
              {countriesArr.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
            </FormControl> 
          <TextField id="standardba-city-input" name="city" label="City" type="text" variant="standard" /> 
          <TextField id="standardba-address-input" name="addressLine1" label="Address"  className="input-text" type="text" variant="standard" />
          <TextField id="standardba-state-input" name="state" label="State" type="text" variant="standard" />      
          <TextField id="standardba-address2-input" name="addressLine2" label="Address Line 2"  className="input-text" type="text" variant="standard" />
          <TextField id="standardba-pincode-input" name="postalCode" label="PinCode" type="number"  variant="standard" />
          </div> 
        </form>
      </DialogContent>
      {/* <DialogActions className="confirm-btn"> */}
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button>Submit</Button>
      </DialogActions>
    </Dialog>
       );

}

export default AddressModal;