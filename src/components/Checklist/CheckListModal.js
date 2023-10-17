import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getDataWithParam, saveDataWithParam } from '../../DataService';
import MileageCaptureModal from "./MileageCaptureModal";
import VehicleAllocationModal from './VehicleAllocationModal';
import DrivingLicenseModal from "./DrivingLicenseModal";
import PickupAddressModal from "./PickupAddressModal";
import AddressModal from "./AddressModal";
import CollectionAddress from './CollectionAddressModal';
import DeliveryAddressModal from "./DelliveryAddressModal";

export default function CheckListModal({
  contractCheckListId = '',
  relatedRecordId,
  type,
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
      if (type === 'Fuel & Mileage' && relatedRecordId) {
        let reqObj = {
          ...obj,
          contractCheckListId,
          relatedRecordId,
          upcomingContractVersionId
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
  if (type === "Date Time;Address") {
    return (
      <DeliveryAddressModal
      open={open}
      contractCheckListId={contractCheckListId}
      upcomingContractVersionId={upcomingContractVersionId}
      handleClose={handleClose}
      handleSubmit={updateChecklistRequest}/>
    );
  }
  // else if (type === "Date Time;Address" && label === "collection_date_delivery_address_verification") {
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
