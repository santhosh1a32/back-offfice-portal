export const CHECKLIST = {
  "CheckListDetails": [
    {
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
      "taskAgentVerifiedDate": "31/12/2023"
    },
    {
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
      "taskAgentVerifiedDate": "31/12/2023"
    },
    {
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
      "taskAgentVerifiedDate": "31/12/2023"
    },
    {
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
      "taskAgentVerifiedDate": "31/12/2023"
    },
    {
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
      "taskAgentVerifiedDate": "31/12/2023"
    },
    {
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
      "taskAgentVerifiedDate": "31/12/2023"
    },
    {
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
      "taskAgentVerifiedDate": "31/12/2023"
    },
    {
      "displayOrder": 8,
      "name": "Capture start mileage & fuel level",
      "description": "Capture the start mileage & start fuel level after taking the vehicle from the dealer and before handing over the car to the customer",
      "taskStatus": "Pending",
      "taskCustomerVerified": false,
      "taskAgentVerified": false,
      "checkListType": "Delivery",
      "contractCheckListId": "a1p5i0000014VQ2AAM",
      "contractId": "a1A5i000000rrcSEAQ"
    }
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
  ]
}