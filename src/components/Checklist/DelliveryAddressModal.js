import * as React from "react";
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

export default function DeliveryAddressModal({open, contractCheckListId,upcomingContractVersionId, handleClose, handleSubmit}){
  const [searchParams] = useSearchParams();
  const [deliveryAddress, setDeliveryAddress] = React.useState({ "addressLine1": "", "city": "", "countryIsoCode": "DE", "postalCode": "", "state": ""});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryAddress({
      ...deliveryAddress,
      [name]: value,
    });
  console.log(deliveryAddress);
  };
 
  const getCheckListItem = () =>{
    let obj = { contractId: searchParams.get("contractId"), contractVersionId: searchParams.get("contractVersionId"), checkListType: searchParams.get("checkListType"),contractCheckListId,upcomingContractVersionId }
    if (window['BackOfficePortalCtrl']) {
        getDataWithParam('BackOfficePortalCtrl', 'getDeliveryAddress', JSON.stringify(obj)).then(result => {
            console.log(result);
            setDeliveryAddress(result.deliveryAddress);
        })
    }
  }

  React.useEffect(() => {
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
      <DialogContentText className="header-text"> Delivery Address </DialogContentText>
            <FormControl sx={{ m:2}} variant="standard" className="select-country"  >
                <InputLabel id="demo-simple-select-label">Country</InputLabel>
                <Select id="outlined-select-country" label="Country" name="countryIsoCode" value={deliveryAddress.countryIsoCode} defaultValue={'DE'} onChange={handleInputChange}>
                {countriesArr.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
                ))}
            </Select>
          </FormControl>
          <TextField id="standard-city-input" name="city" label="City" type="text"variant="standard" value={deliveryAddress.city} onChange={handleInputChange}  defaultValue={''}/> 
          <TextField id="standard-address-input" name="addressLine1" label="Address" className="input-text" type="text" variant="standard" value={deliveryAddress.addressLine1} onChange={handleInputChange}/>
          <TextField id="standard-state-input" name="state" label="State" type="text" variant="standard" value={deliveryAddress.state} onChange={handleInputChange}/>      
          <TextField id="standardba-pincode-input" name="postalCode" label="PinCode" type="number"  variant="standard"  value={deliveryAddress.postalCode} onChange={handleInputChange}/>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button>Submit</Button>
      </DialogActions>
    </Dialog>
       );

}

/**            "deliveryAddress": {
                "addressLine1": "25 Nordallee",
                "city": "München-Flughafen",
                "countryIsoCode": "DE",
                "postalCode": "85356",
                "state": "BY"
            } */
