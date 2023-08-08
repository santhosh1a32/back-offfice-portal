export const CONTRACT_DETAILS = {
    "contractId": "C-021",
    "contractNumber": 90092,
    "contractType": "Subscription",
    "startTime": "02:06:00.000Z",
    "startDate": "2023-07-31",
    "endDate": "2023-08-30",
    "endTime": "02:07:00.000Z",
    "status": "Subscribed",
    "subStatus": "Payment_Sucessfull",
    "renewalfrequency": "Monthly/Weekly..",
    "minimumTerm": "1",
    "customerId": "90010011",
    "mobile": "123",
    "email": "test@test.com",
    "lastName": "test",
    "firstName": "test",
    "contractVersion": [
        {
            "contractVersionId": "CV-1001",
            "status": "Active",
            "startDate": "2023-05-27",
            "endDate": "2023-06-26",
            "contractVersion_BP": {
                "contractVersionBPId": "CVBP-1",
                "productId": "a0I5i00000FPjix",
                "productPricebookId": "a0J5i00000FMj0Y",
                "productPricebookLineItemId": "a0K5i00000M67Ch",
                "priceAllocationType": "Split/Primary",
                "productName": "Tesla Model Y Range",
                "grossAmount": 600,
                "netAmount": 500,
                "taxAmount": 100,
                "productLink": "https://www.google.com/",
                "allocatedVehicle": [{
                    "vin": "12394BA3MNC981278GH",
                    "vehicleId": "VEH-112",
                    "registrationId": "M-HZ-1133",
                    "startMileage": 32321,
                    "endMileage": 100000,
                    "startDate": "2023-06-01",
                    "endDate": "2023-06-30",
                    "startPrimaryFuelLevel": "9/10",
                    "returnPrimaryFuelLevel": "8/10",
                    "status": "Archived"
                },
                {
                    "vin": "12394BA3MNC981278GH",
                    "vehicleId": "VEH-113",
                    "registrationId": "M-HZ-1134",
                    "startMileage": 32321,
                    "endMileage": 100000,
                    "startDate": "2023-07-01",
                    "endDate": "2024-12-31",
                    "startPrimaryFuelLevel": "9/10",
                    "returnPrimaryFuelLevel": "8/10",
                    "status": "Active"
                }]
            },
            "contractVersion_Plan": [
                {
                    "contractVersionPlanId": "CVP-1001",
                    "planId": "a1b5i000005YiJI",
                    "planPricebookId": "a1f5i000000I1tR",
                    "planPricebookLineItemId": "a1g5i00000091Lt",
                    "priceAllocationType": "Primary",
                    "planName": "Basic Plan",
                    "includedMileage": "500 kms",
                    "insuranceExcess": "1000",
                    "planLink": "https://www.google.com/",
                    "grossAmount": 60,
                    "netAmount": 50,
                    "taxAmount": 10
                }
            ],
            "contractVersion_EP": [
                {
                    "contractVersionEPId": "CVEP-1001",
                    "experienceProductId": "a0U5i0000081ufk",
                    "experienceProductPricebookId": "a105i00000Axw8R",
                    "experienceProductPricebookLineItemId": "a0s5i0000029bSR",
                    "priceAllocationType": "Split/Primary",
                    "experienceProductName": "Additional Driver",
                    "experienceProductType": "Add on",
                    "grossAmount": 50,
                    "netAmount": 40,
                    "taxAmount": 10,
                    "experienceProductLink": "https://www.google.com/"
                },
                {
                    "contractVersionEPId": "CVEP-1002",
                    "experienceProductId": "a0U5i0000081ufl",
                    "experienceProductPricebookId": "a105i00000Axe8R",
                    "experienceProductPricebookLineItemId": "a0s5i0000029bSg",
                    "priceAllocationType": "Primary / Split",
                    "experienceProductName": "Platform Fee",
                    "experienceProductType": "Fee",
                    "grossAmount": 30,
                    "netAmount": 25,
                    "taxAmount": 5,
                    "experienceProductLink": "https://www.google.com/"
                },
                {
                    "contractVersionEPId": "CVEP-1003",
                    "experienceProductId": "a0U5i0000081ufj",
                    "experienceProductPricebookId": "a105i00000Axy8R",
                    "experienceProductPricebookLineItemId": "a0s5i0000029bSh",
                    "priceAllocationType": "Primary / Split",
                    "experienceProductName": "Bike Holder",
                    "experienceProductType": "Accessories",
                    "grossAmount": 40,
                    "netAmount": 32,
                    "taxAmount": 8,
                    "experienceProductLink": "https://www.google.com/"
                }
            ]
        }
    ],
    "Invoices": [
        {
            "invoiceNumber": "inv-120212",
            "date": "2023-5-30",
            "summarySplitInfo": "SSI-1",
            "type": "Monthly",
            "status": "Paid",
            "financialBookedId": 9012123,
            "paymentHandling": [
                {
                    "handlingId": "PH-1",
                    "status": "Failure",
                    "numberOfRetries": 0,
                    "nextRetryDate": "-",
                    "paymentCorelationId": "DDJSS-32DWSD-23232",
                    "authorizedAmount": 100,
                    "capturedAmount": 400,
                    "currency": "EUR",
                    "summarySplitId": "SSI-1"
                },
                {
                    "handlingId": "PH-2",
                    "status": "Success",
                    "numberOfRetries": 0,
                    "nextRetryDate": "-",
                    "paymentCorelationId": "DDJSS-32DWSD-23234",
                    "authorizedAmount": 100,
                    "capturedAmount": 400,
                    "currency": "EUR",
                    "summarySplitId": "SSI-1"
                }
            ]
        },
        {
            "invoiceNumber": "inv-120211",
            "date": "2023-6-30",
            "summarySplitInfo": "SSI-2",
            "type": "Monthly",
            "status": "Paid",
            "financialBookedId": 9012122,
            "paymentHandling": [
                {
                    "handlingId": "PH-14",
                    "status": "Failure",
                    "numberOfRetries": 0,
                    "nextRetryDate": "-",
                    "paymentCorelationId": "DDJSS-32DWSD-23232",
                    "authorizedAmount": 100,
                    "capturedAmount": 400,
                    "currency": "EUR",
                    "summarySplitId": "SSI-2"
                },
                {
                    "handlingId": "PH-21",
                    "status": "Success",
                    "numberOfRetries": 0,
                    "nextRetryDate": "-",
                    "paymentCorelationId": "DDJSS-32DWSD-23234",
                    "authorizedAmount": 100,
                    "capturedAmount": 400,
                    "currency": "EUR",
                    "summarySplitId": "SSI-2"
                }
            ]
        }
    ]
}