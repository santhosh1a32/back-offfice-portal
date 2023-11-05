import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getDataWithParam, saveDataWithParam } from '../../DataService';
import MileageCaptureModal from "./MileageCaptureModal";
import VehicleAllocationModal from './VehicleAllocationModal';
import DrivingLicenseModal from "./DrivingLicenseModal";
import PickupAddressModal from "./PickupAddressModal";
import AddressModal from "./AddressModal";
import CollectionAddress from './CollectionAddressModal';
import DeliveryAddressModal from "./DeliveryAddressModal";

export default function CheckListModal({
  contractCheckListId = '',
  relatedRecordId,
  type,
  label,
  open,
  handleClose,
  uuidData,
  upcomingContractVersionId=''
}) {
  const [searchParams] = useSearchParams();
  const [vehicleDetails, setVehicleDetails] = React.useState();
  const [mileageDetails, setMileageDetails] = React.useState();
  const [drivingLicenseDetails, setDrivingLicenseDetails] = React.useState([]);

  const checkListType = searchParams.get("checkListType");

  const confirmVehicleAllocation = (id) => {
    let reqObj = {
      contractId: searchParams.get("contractId"),
      contractVersionId: searchParams.get("contractVersionId"),
      checkListType: searchParams.get("checkListType"),
      contractCheckListId,
      vehicleId: id,
      ...uuidData
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
      ...uuidData
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
      upcomingContractVersionId
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
      upcomingContractVersionId,
      ...uuidData
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

  const updateAddress = (homeAddrValues, billingAddrformValues) => {
    updateChecklistRequest({
      taskStatus: 'Verified',
      jsonData: {
        addressDetails: [{
          homeAddress: homeAddrValues,
          billingAddress: billingAddrformValues
        }]
      }
    })
  }

  const updatePickUpAddress = (pickupAddrValues) => {
    console.log(pickupAddrValues);
    updateChecklistRequest({
      taskStatus: 'Verified',
      jsonData: {
        pickupAddress: pickupAddrValues.pickupAddress,
        pickupDetails : pickupAddrValues.pickupDetails
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
          upcomingContractVersionId
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
      if (type === 'Fuel & Mileage') {
        let reqObj = {
          ...obj,
          contractCheckListId,  
          upcomingContractVersionId
        }
        if (relatedRecordId) {
          reqObj.relatedRecordId = relatedRecordId;
        }
        getDataWithParam('BackOfficePortalCtrl', 'returnMileageAndFuel', JSON.stringify(reqObj)).then(result => {
          console.log(result);
          if (result) {
            let obj = {
              mileage: label === 'capture_start_mileage_fuel_level' ? result.startMileage : result.MileageAndFuelDetails.returnMileage,
              fuelLevel: label === 'capture_start_mileage_fuel_level' ? result.startFuelLevel : result.MileageAndFuelDetails.returnFuel
            }
            setMileageDetails(obj);
          }
        })
      }
    }
  }, [])

  if (label === 'capture_start_mileage_fuel_level') {
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
  if (label === 'Fuel & Mileage') {
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
  if (label === 'vehicle_allocation') {
    return (
      <VehicleAllocationModal
        vehicleDetails={vehicleDetails}
        open={open}
        handleClose={handleClose}
        handleSubmit={confirmVehicleAllocation}
      />
    )
  }

  if (label === 'driving_license_verification') {
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
  if (label === "delivery_date_delivery_address_verification") {
    return (
      <DeliveryAddressModal
      open={open}
      contractCheckListId={contractCheckListId}
      upcomingContractVersionId={upcomingContractVersionId}
      handleClose={handleClose}
      handleSubmit={updateChecklistRequest}/>
    );
  }
  // else if (label === "customer_handshake") {
  //   return (
  //     <CollectionAddress
  //     open={open}
  //     contractCheckListId={contractCheckListId}
  //     upcomingContractVersionId={upcomingContractVersionId}
  //     handleClose={handleClose}
  //     handleSubmit={updatePickUpAddress}/>
  //   )
  // }
}
