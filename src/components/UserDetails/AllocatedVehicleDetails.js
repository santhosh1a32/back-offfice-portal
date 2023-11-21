import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import SectionWithTitle from "../common/SectionWithTitle";
import Title from '../common/Title';

const columns = [
  { field: "allocatedVehicle", label: "Allocated Vehicle", minWidth: 170 },
  { field: "registrationNumber", label: "Registration Number", minWidth: 100 },
  { field: "startMileage", label: "Start Mileage", minWidth: 100 },
  { field: "startFuelLevel", label: "Start Fuel Level", minWidth: 100 },
  { field: "endMileage", label: "End Mileage", minWidth: 100 },
  { field: "endFuelLevel", label: "End Fuel Level", minWidth: 100 }
];

const vehiclesData = [{
  "allocatedVehicle":"Tesla Model Y",
  "registrationNumber":"MUC 7632",
  "VIN":"",
  "startMileage":"2000",
  "startFuelLevel":"8",
  "endMileage":"2500",
  "endFuelLevel":"5",
  "startDate":"17/11/2023",
  "endDate":"30/11/2023"
}]


export default function AllocatedVehicleDetails({allocatedVehicle}) {
 // const[vehicles, setVehicles] = React.useState(vehiclesData);
  return ( 
    <React.Fragment>
      <Title>Allocated Vehicle Details</Title>
      <Table size="small" className='bck-office-table'>
        <TableHead>
          <TableRow>
            <TableCell>Registration Number</TableCell>
            <TableCell>VIN</TableCell>
            <TableCell>Start Mileage</TableCell>
            <TableCell>Start Fuel Level</TableCell>
            <TableCell>End Mileage</TableCell>
            <TableCell>End Fuel Level</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allocatedVehicle && 
            <TableRow key={allocatedVehicle.alllocatedVehicleId}>
              <TableCell>{allocatedVehicle.vehiclePlateNumber}</TableCell>
              <TableCell>{allocatedVehicle.vehicleVIN}</TableCell>
              <TableCell>{allocatedVehicle.startMileage}</TableCell>
              <TableCell>{allocatedVehicle.startFuel}</TableCell>
              <TableCell>{allocatedVehicle.endMileage}</TableCell>
              <TableCell>{allocatedVehicle.endFuel}</TableCell>
              <TableCell>{allocatedVehicle.startDate}</TableCell>
              <TableCell>{allocatedVehicle.endDate}</TableCell>
            </TableRow>
          }
        </TableBody>
      </Table>
      {/* <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link> */}
    </React.Fragment>
  );
}
