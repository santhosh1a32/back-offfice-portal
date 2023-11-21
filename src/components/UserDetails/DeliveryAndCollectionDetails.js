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
import dayjs from 'dayjs'


const detailsData = [{
  "deliveryAddress":"One Infinite Loop, Cupertino, CA 95014, United States",
  "deliveryTime":"16.00-20.00",
  "collectionAddress":"One Infinite Loop, Cupertino, CA 95014, United States",
  "collectionTime":"16.00-20.00"
}]


export default function DeliveryAndCollectionDetails({deliveryDetails}) {
  return(
    <React.Fragment>
      <Title>Delivery And Collection Details</Title>
      <Table size="small" className='bck-office-table'>
        <TableHead>
          <TableRow>
            <TableCell>Delivery Address</TableCell>
            <TableCell>Delivery Time</TableCell>
            <TableCell>Collection Address</TableCell>
            <TableCell>Collection Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {deliveryDetails &&
            <TableRow key={deliveryDetails.contractVersionId}>
              <TableCell>{deliveryDetails.deliveryAddress}</TableCell>
              <TableCell>{dayjs(deliveryDetails.deliveryDate).format('DD-MM-YYYY') +"   "+ deliveryDetails.deliveryTime || ''}</TableCell>
              <TableCell>{deliveryDetails.collectionAddress}</TableCell>
              <TableCell>{deliveryDetails.collectionTime}</TableCell>
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
