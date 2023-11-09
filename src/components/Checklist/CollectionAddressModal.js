import * as React from 'react';
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
import { getDataWithParam } from '../../DataService';
import CustomDatePicker from "../common/CustomDatePicker";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import dayjs from 'dayjs'


countries.registerLocale(enLocale);
const countriesObj = countries.getNames("en",{select:"official"});
const countriesArr = Object.entries(countriesObj).map(([key,value]) =>{
  return{
    label:value,
    value:key
  }
});

const CollectionAddress = ({open, contractCheckListId,upcomingContractVersionId, handleClose, handleSubmit}) => {
    const [searchParams] = useSearchParams();
    const [collectionAddress, setCollectionAddress] = React.useState({ "addressLine1": "", "addressLine2": "", "city": "", "countryIsoCode": "DE", "postalCode": "", "state": ""});
    const [collectionDateTime, setCollectionDateTime] = React.useState({collectionDate: '', collectionTime: ''});
    const timeFrames = [
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
    // const options = {  autocomplete:{
    //   mode:'google_maps_api',
    //   apiKey:'apikey'
    // } };

    const handleInputChange = (e, type) => {
      if (type === 'collectionDate') {
        const timeDate = {...collectionDateTime, collectionDate: e}
        setCollectionDateTime(timeDate)
      } else if(e.target.name === 'collectionTime') {
        const timeDate = {...collectionDateTime, collectionTime: e.target.value}
        setCollectionDateTime(timeDate)
      } else {
        const { name, value } = e.target;
        setCollectionAddress({
          ...collectionAddress,
          [name]: value,
        });
        console.log(collectionAddress);
      }
    };

  const getCheckListItem = () =>{
    let obj = { contractId: searchParams.get("contractId"), contractVersionId: searchParams.get("contractVersionId"), checkListType: searchParams.get("checkListType"),contractCheckListId,upcomingContractVersionId }
    if (window['BackOfficePortalCtrl']) {
        getDataWithParam('BackOfficePortalCtrl', 'getCollectionAddress', JSON.stringify(obj)).then(result => {
            console.log(result);
            setCollectionAddress(result.collectionAddress);
            setCollectionDateTime({
              ...collectionDateTime,
              collectionDate: result.collectionDate ? dayjs(result.collectionDate) : '',
              collectionTime: result.collectionTime ? result.collectionTime : ''
            })
        })
    }
  }

  const updateCollectionAddress = () => {
    handleSubmit({
      jsonData: {
        collectionAddress: {
          ...collectionAddress
        },
        ...collectionDateTime
      }
    }) 
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
        {/* <DialogContent className="collection-addr-form"> */}
          {/* <form>
            <DialogContentText className="header-text"> Collection Address </DialogContentText>
            <div className="pickup">
            <CustomDatePicker className="pickup-date" label="Pickup Date" value={dayjs(pickupAddrValues.pickupDetails.pickupDate)} disablePast={true} onChangeHandler={(val)=>handleInputChange(val,'pickupDate')} />  
            <FormControl sx={{ m: 2 }} variant="standard" className="select-pickup">
              <InputLabel id="demo-label">Pickup Time</InputLabel>
                <Select id="outlined-select-pickuptime" label="PickupTime"  name="pickupTime" value={pickupAddrValues.pickupDetails.pickupTime} onChange={handleInputChange}>
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
                <Select id="outlined-select-country" label="Country"  name="countryIsoCode" value={pickupAddrValues.pickupAddress.countryIsoCode} onChange={handleInputChange}>
                {countriesArr.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            </FormControl>
            <TextField id="standard-city-input" name="city" label="City" type="text" variant="standard" value={pickupAddrValues.pickupAddress.city} onChange={handleInputChange} /> 
            <TextField id="standard-address-input" name="addressLine1" label="Address" className="input-text" type="text" variant="standard" value={pickupAddrValues.pickupAddress.addressLine1} onChange={handleInputChange}/> */}
            {/* <Elements stripe={stripe}>
             <AddressElement options={{
              mode: "shipping",
              autocomplete: {
                mode: "google_maps_api",
                apiKey: "AIzaSyBMOR-ps0vgfG16DoizCpDkxBTRFnpZWXE",
              },
            }} /> 
            </Elements> */}
            {/* <TextField id="standard-state-input" name="state" label="State" type="text" variant="standard" value={pickupAddrValues.pickupAddress.state} onChange={handleInputChange}/>      
            <TextField id="standard-address2-input" name="addressLine2" label="Address Line 2" className="input-text" type="text" variant="standard" value={pickupAddrValues.pickupAddress.addressLine2} onChange={handleInputChange}/>
            <TextField id="standard-pincode-input" name="postalCode" label="PinCode" type="number"  variant="standard"  value={pickupAddrValues.pickupAddress.postalCode} onChange={handleInputChange}/>
          </form> */}
        {/* </DialogContent> */}
        <DialogContent className="collection-addr-form">
              <DialogContentText className="header-text"> Collection Address </DialogContentText>
              <div className="pickup">
                <CustomDatePicker className="pickup-date" label="Collection Date" value={dayjs(collectionDateTime.collectionDate)} disablePast={true} onChangeHandler={(val) => handleInputChange(val, 'collectionDate')} />
                {/* <FormControl sx={{ m: 2 }} variant="standard" className="select-pickup">
                  <InputLabel id="demo-label">Delivery Time</InputLabel>
                  <Select id="outlined-select-pickuptime" label="Delivery Time" name="deliveryTime" value={deliveryDateTime.deliveryTime} onChange={handleInputChange}>
                    {timeFrames.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl> */}
                <TextField id="standard-address-input" name="collectionTime" label="Collection Time" type="text" className="input-text-2" variant="standard" value={collectionDateTime.collectionTime} onChange={handleInputChange}/>
              </div>
              <TextField id="standard-address-input" name="addressLine1" label="Address Line 1" className="input-text" type="text" variant="standard" value={collectionAddress.addressLine1} onChange={handleInputChange}/>
              <TextField id="standard-address-input2" name="addressLine2" label="Address Line 2" className="input-text-2"  type="text" variant="standard" value={collectionAddress.addressLine2} onChange={handleInputChange}/>
              <TextField id="standard-city-input" name="city" label="City" type="text" className="input-text" variant="standard" value={collectionAddress.city} onChange={handleInputChange}/> 
              <TextField id="standardba-pincode-input" name="postalCode" label="PinCode" type="number" className="input-text-2" variant="standard"  value={collectionAddress.postalCode} onChange={handleInputChange}/>
              <TextField id="standard-state-input" name="state" label="State" type="text" className="input-text" variant="standard" value={collectionAddress.state} onChange={handleInputChange}/>      
              <FormControl sx={{ m:2}} variant="standard" className="select-country">
                  <InputLabel id="demo-simple-select-label">Country</InputLabel>
                  <Select id="outlined-select-country" label="Country" name="countryIsoCode" value={collectionAddress.countryIsoCode} onChange={handleInputChange}>
                  {countriesArr.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                      {option.label}
                  </MenuItem>
                  ))}
              </Select>
            </FormControl>
            
        </DialogContent>
        {/* <DialogActions className="confirm-btn"> */}
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={updateCollectionAddress}>Confirm</Button>
        </DialogActions>

      </Dialog>
  
    )
}

export default CollectionAddress;