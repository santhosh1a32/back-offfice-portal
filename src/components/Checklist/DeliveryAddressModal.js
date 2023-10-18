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
  import dayjs from 'dayjs';

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
    const [deliveryAddress, setDeliveryAddress] = React.useState({ "addressLine1": "", "addressLine2": "", "city": "", "countryIsoCode": "DE", "postalCode": "", "state": ""});
    const [deliveryDateTime, setDeliveryDateTime] = React.useState({deliveryDate: '', deliveryTime: ''});
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
    const handleInputChange = (e, type) => {
      if (type === 'deliveryDate') {
        const timeDate = {...deliveryDateTime, deliveryDate: e}
        setDeliveryDateTime(timeDate)
      } else if(e.target.name === 'deliveryTime') {
        const timeDate = {...deliveryDateTime, deliveryTime: e.target.value}
        setDeliveryDateTime(timeDate)
      } else {
        const { name, value } = e.target;
        setDeliveryAddress({
          ...deliveryAddress,
          [name]: value,
        });
        console.log(deliveryAddress);
      }
    };
  
    const getCheckListItem = () =>{
      let obj = { contractId: searchParams.get("contractId"), contractVersionId: searchParams.get("contractVersionId"), checkListType: searchParams.get("checkListType"),contractCheckListId,upcomingContractVersionId }
      if (window['BackOfficePortalCtrl']) {
          getDataWithParam('BackOfficePortalCtrl', 'getDeliveryAddress', JSON.stringify(obj)).then(result => {
              console.log(result);
              setDeliveryAddress(result.deliveryAddress);
              console.log('develivery date ===> ', dayjs(result.deliveryDate))
              setDeliveryDateTime({
                ...deliveryDateTime,
                deliveryDate: result.deliveryDate ? dayjs(result.deliveryDate) : '',
                deliveryTime: result.deliveryTime ? result.deliveryTime : ''
              })
          })
      }
    }

    const updateDeliveryAddress = () => {
      handleSubmit({
        jsonData: {
          deliveryAddress: {
            ...deliveryAddress
          },
          ...deliveryDateTime
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
        <DialogContent className="pickup-form">
              <DialogContentText className="header-text"> Delivery Address </DialogContentText>
              <div className="pickup">
                <CustomDatePicker className="pickup-date" label="Delivery Date" value={dayjs(deliveryDateTime.deliveryDate)} disablePast={true} onChangeHandler={(val) => handleInputChange(val, 'deliveryDate')} />
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
                <TextField id="standard-address-input" name="deliveryTime" label="Delivery Time" type="text" className="input-text-2" variant="standard" value={deliveryDateTime.deliveryTime} onChange={handleInputChange}/>
              </div>
              <TextField id="standard-address-input" name="addressLine1" label="Address Line 1" className="input-text" type="text" variant="standard" value={deliveryAddress.addressLine1} onChange={handleInputChange}/>
              <TextField id="standard-address-input2" name="addressLine2" label="Address Line 2" className="input-text-2"  type="text" variant="standard" value={deliveryAddress.addressLine2} onChange={handleInputChange}/>
              <TextField id="standard-city-input" name="city" label="City" type="text" className="input-text" variant="standard" value={deliveryAddress.city} onChange={handleInputChange}  defaultValue={''}/> 
              <TextField id="standardba-pincode-input" name="postalCode" label="PinCode" type="number" className="input-text-2" variant="standard"  value={deliveryAddress.postalCode} onChange={handleInputChange}/>
              <TextField id="standard-state-input" name="state" label="State" type="text" className="input-text" variant="standard" value={deliveryAddress.state} onChange={handleInputChange}/>      
              <FormControl sx={{ m:2}} variant="standard" className="select-country">
                  <InputLabel id="demo-simple-select-label">Country</InputLabel>
                  <Select id="outlined-select-country" label="Country" name="countryIsoCode" value={deliveryAddress.countryIsoCode} defaultValue={'DE'} onChange={handleInputChange}>
                  {countriesArr.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                      {option.label}
                  </MenuItem>
                  ))}
              </Select>
            </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={updateDeliveryAddress}>Confirm</Button>
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
