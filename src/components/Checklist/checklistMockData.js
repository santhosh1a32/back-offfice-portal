export const CHECKLIST = {
  "CheckListDetails": [
    {
      "contractCheckListId": 12345,
      "checkListType": "Pickup",
      "inputType": null,
      "taskAgentVerifiedByName": "AgentName",
      "taskAgentVerifiedById": 123123,
      "taskStatus": "Verified",
      "description": "Welcome the customer and onboard them to Zenova",
      "name": "Customer Handshake",
      "displayOrder": 1,
      "taskCustomerVerified": false,
      "taskCustomerVerifiedDate": "31/12/2023",
      "taskAgentVerified": true,
      "taskAgentVerifiedDate": "31/12/2023",
      "relatedRecordId": "a0N5i000006xB3ZEHU"
    },
    {
      "contractCheckListId": 12346,
      "checkListType": "Pickup",
      "inputType": null,
      "taskAgentVerifiedByName": "AgentName",
      "taskAgentVerifiedById": 123123,
      "taskStatus": "Verified",
      "description": "Verify if the advance payment is made while registering and booking a product",
      "name": "Advance Payment Verification",
      "displayOrder": 2,
      "taskCustomerVerified": true,
      "taskCustomerVerifiedDate": "31/12/2023",
      "taskAgentVerified": true,
      "taskAgentVerifiedDate": "31/12/2023",
      "relatedRecordId": "a0N5i000006xB3ZEGU"
    },
    {
      "contractCheckListId": 12347,
      "checkListType": "Pickup",
      "inputType": "Mobile Number",
      "taskAgentVerifiedByName": "AgentName",
      "taskAgentVerifiedById": 123123,
      "taskStatus": "Verified",
      "description": "Check if the customer has added the mobile number and verified the same",
      "name": "Mobile Number Verification",
      "displayOrder": 3,
      "taskCustomerVerified": true,
      "taskCustomerVerifiedDate": "31/12/2023",
      "taskAgentVerified": true,
      "taskAgentVerifiedDate": "31/12/2023",
      "relatedRecordId": "a0N5i000006xB3ZEFU"
    },
    {
      "contractCheckListId": 12348,
      "checkListType": "Pickup",
      "inputType": "Address",
      "taskAgentVerifiedByName": "ABC",
      "taskAgentVerifiedById": 123123,
      "taskStatus": "Pending",
      "description": "Check if the customer has added the home and billing address",
      "name": "Home & Billing Address Verification",
      "displayOrder": 4,
      "taskCustomerVerified": true,
      "taskCustomerVerifiedDate": "31/12/2023",
      "taskAgentVerified": false,
      "taskAgentVerifiedDate": "31/12/2023",
      "relatedRecordId": "a0N5i000006xB3ZEEU"
    },
    {
      "contractCheckListId": 12349,
      "checkListType": "Pickup",
      "inputType": "Date Time;Address",
      "taskAgentVerifiedByName": "AgentName",
      "taskAgentVerifiedById": 123123,
      "taskStatus": "Pending",
      "description": "Check if the customer has added the pickup date time and pickup address",
      "name": "Pickup Date & Address Verification",
      "displayOrder": 5,
      "taskCustomerVerified": true,
      "taskCustomerVerifiedDate": "31/12/2023",
      "taskAgentVerified": true,
      "taskAgentVerifiedDate": "31/12/2023",
      "relatedRecordId": "a0N5i000006xB3ZEDU"
    },
    {
      "contractCheckListId": 123410,
      "checkListType": "Pickup",
      "inputType": "Driving License",
      "taskAgentVerifiedByName": "AgentName",
      "taskAgentVerifiedById": 123123,
      "taskStatus": "Pending",
      "description": "Check if the customer has added the Driving License and if it is verified by Stripe, if not please read the license and add the details manually and verify",
      "name": "Driving License Verification",
      "displayOrder": 6,
      "taskCustomerVerified": true,
      "taskCustomerVerifiedDate": "31/12/2023",
      "taskAgentVerified": true,
      "taskAgentVerifiedDate": "31/12/2023",
      "relatedRecordId": "a0N5i000006xB3ZECU"
    },
    {
      "contractCheckListId": 123411,
      "checkListType": "Pickup",
      "inputType": "Vehicle Allocation",
      "taskAgentVerifiedByName": "AgentName",
      "taskAgentVerifiedById": 123123,
      "taskStatus": "Pending",
      "description": "Allocate the vehicle to the customer from the inventory",
      "name": "Vehicle Allocation",
      "displayOrder": 7,
      "taskCustomerVerified": true,
      "taskCustomerVerifiedDate": "31/12/2023",
      "taskAgentVerified": true,
      "taskAgentVerifiedDate": "31/12/2023",
      "relatedRecordId": "a0N5i000006xB3ZEBU"
    },
    {
      "contractCheckListId": 123412,
      "displayOrder": 8,
      "name": "Capture start mileage & fuel level",
      "inputType": "Fuel & Mileage",
      "description": "Capture the start mileage & start fuel level after taking the vehicle from the dealer and before handing over the car to the customer",
      "taskStatus": "Pending",
      "taskCustomerVerified": false,
      "taskAgentVerified": false,
      "checkListType": "Delivery",
      "contractCheckListId": "a1p5i0000014VQ2AAM",
      "contractId": "a1A5i000000rrcSEAQ",
      "relatedRecordId": "a0N5i000006xB3ZEAU"
    },
    {
      "displayOrder": 9,
      "name": "Capture return mileage & fuel level",
      "description": "Capture the start mileage & start fuel level after taking the vehicle from the dealer and before handing over the car to the customer",
      "taskStatus": "Pending",
      "taskAgentVerifiedByName": "Shiva Sudhakar",
      "taskCustomerVerified": false,
      "taskAgentVerified": false,
      "inputType": "Fuel & Mileage",
      "checkListType": "Collection",
      "contractCheckListId": "a1p5i0000014VQMAA2",
      "contractId": "a1A5i000000rrcSEAQ"
    },
  ],
  "addressDetails": [
    {
      "billingAddress":
      {
        "state": "Karnataka",
        "postalCode": "560001",
        "countryIsoCode": "DE",
        "city": "Bangalore",
        "addressLine2": "MG Road",
        "addressLine1": "232",
        "relatedRecordId": ""
      },
      "homeAddress": {
        "state": "Karnataka",
        "postalCode": "560001",
        "countryIsoCode": "IN",
        "city": "Bangalore",
        "addressLine2": "MG Road",
        "addressLine1": "232",
        "relatedRecordId": ""
      }
    }
  ],
  "pickUpAddressDetails": {
    "state": "Karnataka",
    "postalCode": "560001",
    "countryIsoCode": "IN",
    "city": "Bangalore",
    "addressLine2": "MG Road",
    "addressLine1": "232",
    "relatedRecordId": ""
  },
  "result": {
    "pickupDetails": {
      "pickupDate": 1685577600000,
      "pickupTime": "10:00-11:00"
    },
    "pickupAddress": {
      "addressLine1": "",
      "addressLine2": "",
      "city": "",
      "countryIsoCode": "",
      "postalCode": "",
      "state": ""
    }
  }
}