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
  { field: "checkListType", label: "CheckList Type", minWidth: 170 },
  { field: "name", label: "Name", minWidth: 100 },
  { field: "taskAgentVerifiedDate", label: "Task Agent Verified Date", minWidth: 100 },
  { field: "taskCustomerVerifiedDate", label: "Task Customer Verified Date", minWidth: 100 },
  { field: "action", label: "Action", minWidth: 100 },
//   { field: "endFuelLevel", label: "End Fuel Level", minWidth: 100 }
];

const completedCheckListDetails = [{
    "checkListId":"",
    "checkListType":"",
    "name":"",
    "taskAgentVerifiedDate":"",
    "taskCustomerVerifiedDate":"",
    "action":""
}]


export default function CompletedCheckList({completedCheckList}) {
  return ( 
    <Grid container spacing={3}>
    <Grid item xs={12} className="section">
        <SectionWithTitle title={"Completed Checklist Details"}></SectionWithTitle>
        <Paper sx={{ width: "100%", overflow: "hidden", marginTop: "10px" }}>
      <Table size="small" className='bck-office-table'>
        <TableHead>
          <TableRow>
            <TableCell>CheckList Type</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Task Customer Verified Date</TableCell>
            <TableCell>Task Agent Verified Date</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {completedCheckList && 
            <TableRow key={completedCheckList.checkListId}>
              <TableCell>{completedCheckList.checkListType}</TableCell>
              <TableCell>{completedCheckList.name}</TableCell>
              <TableCell>{completedCheckList.taskCustomerVerifiedDate}</TableCell>
              <TableCell>{completedCheckList.taskAgentVerifiedDate}</TableCell>
              <TableCell>{completedCheckList.action}</TableCell>          
            </TableRow>
          }
        </TableBody>
      </Table>
      </Paper>
      </Grid>
      </Grid>
  );
}
