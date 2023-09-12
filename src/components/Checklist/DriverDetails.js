import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

const rows = [
    {
        "firstName": "Nine",
        "lastName": "Test",
        "email": "nine@test.com",
        "mobile": "98768754646",
        "endDate": 1703980800000,
        "startDate": 1672531200000,
        "driverStatus": "Active",
        "driverType": "Primary",
        "registerDriverId": "a1K5i000000EctNEAS",
        "licenseDetails": {
            "checkPerformedDate": 1693094400000,
            "checkPerformedBy": "Stripe",
            "checkStatus": "High",
            "checkDocumentUrl": "https://www.google.com/",
            "checkSelfieUrl": "https://www.google.com/",
            "frontSideDocumentUrl": "https://www.google.com/",
            "backSideDocumentUrl": "https://www.google.com/",
            "licenseNumber": "76587698",
            "firstName": "Nine",
            "lastName": "Test",
            "issuingCountry": "Germany",
            "issuingDate": 1331251200000,
            "expiryDate": 1962403200000,
            "status": "Active",
            "issuingAuthority": "RTO"
        }
    }
];

export default function DriverDetails({ drivingLicenseDetails, verifyHandler, handleChange }) {
    const [driverDetails, setDriverDetails] = React.useState([]);
    const setLicenseVerification = (registerDriverId, e) => {
        console.log(registerDriverId, e);
        let details = [...driverDetails];
        details.forEach(item => {
            if(item.registerDriverId === registerDriverId) {
                item.drivingLicenseVerificationStatus = e.target.value;
            }
        })
        setDriverDetails(details);
        handleChange(details)
    }
    React.useEffect(() => {
        if (window['BackOfficePortalCtrl']) {
            setDriverDetails(drivingLicenseDetails)
        } else {
            setDriverDetails(rows)
        }
    }, [drivingLicenseDetails])

    return (
        <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Type</TableCell>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Start Date</TableCell>
                        <TableCell>End Date</TableCell>
                        <TableCell>Driver Status</TableCell>
                        <TableCell>DL Verificaion Status</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {driverDetails.map((row) => (
                        <TableRow
                            key={row.registerDriverId}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell>{row.driverType}</TableCell>
                            <TableCell>{row.firstName}</TableCell>
                            <TableCell>{row.lastName}</TableCell>
                            <TableCell>{row.email}</TableCell>
                            <TableCell>{row.startDate}</TableCell>
                            <TableCell>{row.endDate}</TableCell>
                            <TableCell>{row.driverStatus}</TableCell>
                            <TableCell>
                                <FormControl sx={{ m: 1, minWidth: 120 }}>
                                    <InputLabel id="demo-simple-select-helper-label">Type</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        value={row.drivingLicenseVerificationStatus}
                                        label="Type"
                                        name="drivingLicenseVerificationStatus"
                                        onChange={(e) => setLicenseVerification(row.registerDriverId, e)}
                                    >
                                        <MenuItem value="Pending">Pending</MenuItem>
                                        <MenuItem value="Verified">Verified</MenuItem>
                                        <MenuItem value="Rejected">Rejected</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell>
                                <Button variant="text" onClick={() => verifyHandler(row.licenseDetails, row.registerDriverId)}>View / Edit</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer >
    )
}