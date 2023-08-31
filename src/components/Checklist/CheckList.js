import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Button} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import "./CheckList.scss";
import CheckListModal from "./CheckListModal";
import { CHECKLIST } from "./checklistMockData";
import SectionWithTitle from '../common/SectionWithTitle';
import { getDataWithParam } from '../../DataService';

const columns = [
  { field: "displayOrder", label: "Sl. No", minWidth: 50 },
  { field: "name", label: "Task Name", minWidth: 100 },
  { field: "taskCustomerVerified", label: "Has Customer Verified?", minWidth: 50 },
  { field: "taskCustomerVerifiedDate", label: "Customer Verified On", minWidth: 100 },
  { field: "taskAgentVerified", label: "Has Agent Verified?", minWidth: 50 },
  { field: "taskAgentVerifiedByName", label: "Verified Agent Name", minWidth: 100 },
  { field: "taskAgentVerifiedDate", label: "Agent Verification Date", minWidth: 100 },
  { field: "actions", label: "Actions", minWidth: 100 }
];

const checkListColumns = [
  { field: "displayOrder", label: "Sl. No", minWidth: 50 },
  { field: "name", label: "Task Name", minWidth: 100 },
  { field: "taskAgentVerified", label: "Has Agent Verified?", minWidth: 50 },
  { field: "taskAgentVerifiedByName", label: "Verified Agent Name", minWidth: 100 },
  { field: "taskAgentVerifiedDate", label: "Agent Verification Date", minWidth: 100 },
  { field: "actions", label: "Actions", minWidth: 100 }
]

export default function CheckList() {
  const [searchParams] = useSearchParams();
  const [checkList, setCheckList] = useState(CHECKLIST);
  const [openCheckListDialog, setCheckListDialog] = useState(false);
  const [type,setTypeData] = useState("");
        
    const closeCheckListDialog = () => {
        setCheckListDialog(false);
    };

    const showCheckListModal = (type) => {
            setTypeData(type)
            setCheckListDialog(true);
        };
          
    const getCheckListData = () => {
      var obj = { contractId: searchParams.get("contractId"),contractVersionId:searchParams.get("contractVersionId"),checkListType:searchParams.get("checkListType") }
      if (window['BackOfficePortalCtrl']) {
          getDataWithParam('BackOfficePortalCtrl', 'returnCheckListDetails', JSON.stringify(obj)).then(result => {
              console.log(result);
              setCheckList(result);
          })
      }
     }

    const saveCheckList = (formValues,billingAddrformValues) => {
      // console.log(formValues);
      // console.log(billingAddrformValues);   
      switch(type){
        case "Address" : {
         // console.log(type);
          break;
        }
        case "Date Time;Address" :{
         // console.log(type);
          break;
        }
        default: {

        }
      }
    }

    useEffect(() => {
      getCheckListData();
    }, [])

   { 
    if(searchParams.get("checkListType") === "Pickup")
    return (
      <>
        <Grid container spacing={3}>
          <SectionWithTitle title={"Pickup Checklist"}></SectionWithTitle>
          <Grid item xs={12}>
            <Paper sx={{ width: "100%", overflow: "hidden", minHeight:100 }}>
              <div className="button-grp">
              <Button size="small" variant="contained" disabled > Complete Checklist </Button>
              <Button size="small" variant="outlined" className="checklist-button"> Cancel Checklist </Button>
              </div>
            </Paper>
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <TableContainer sx={{ maxHeight: 600 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.field}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {checkList.CheckListDetails.map((row) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.displayOrder} >
                          {columns.map((column) => {
                            const value = row[column.field];
                            if(column.field === "actions"){
                              return (
                                <TableCell key={row.displayOrder}>
                                { row["taskAgentVerified"] === false ?
                                 (<><Button variant="text" onClick={() => showCheckListModal(row.inputType)}>Add</Button>|
                                 <Button variant="text" onClick={() => showCheckListModal(row.inputType)}>Verify</Button></>)
                                 :(<Button variant="text" onClick={() => showCheckListModal(row.inputType)}>View  </Button>)}
                                </TableCell>
                              )
                            }
                            else{
                              return (
                                <TableCell key={column.field} align={column.align} >
                                  {column.field === "taskCustomerVerified" ||
                                  column.field === "taskAgentVerified" ? (
                                    <Checkbox checked={value} />
                                  ) : (
                                    value
                                  )}
                                </TableCell>
                              );
                              }
                          })}
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>

        {openCheckListDialog && (
          <CheckListModal
            type={type}
            open={openCheckListDialog}
            handleClose={closeCheckListDialog}
            handleSubmit={saveCheckList}
          />
        )}
      </>
    );
     else if(searchParams.get("checkListType") === "Delivery")   {
      return (
        <>
        <Grid container spacing={3}>
          <SectionWithTitle title={"Delivery Checklist"}></SectionWithTitle>
          <Grid item xs={12}>
            <Paper sx={{ width: "100%", overflow: "hidden", minHeight:100 }}>
              <div className="button-grp">
              <Button size="small" variant="contained" disabled > Complete Checklist </Button>
              <Button size="small" variant="outlined" className="checklist-button"> Cancel Checklist </Button>
              </div>
            </Paper>
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <TableContainer sx={{ maxHeight: 600 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {checkListColumns.map((column) => (
                        <TableCell
                          key={column.field}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {checkList.CheckListDetails.map((row) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.displayOrder} >
                          {checkListColumns.map((column) => {
                            const value = row[column.field];
                            if(column.field === "actions"){
                              return (
                                <TableCell key={row.displayOrder}>
                                { row["taskAgentVerified"] === false ?
                                 (<><Button variant="text" onClick={() => showCheckListModal(row.inputType)}>Add</Button>|
                                 <Button variant="text" onClick={() => showCheckListModal(row.inputType)}>Verify</Button></>)
                                 :(<Button variant="text" onClick={() => showCheckListModal(row.inputType)}>View  </Button>)}
                                </TableCell>
                              )
                            }
                            else{
                              return (
                                <TableCell key={column.field} align={column.align} >
                                  {column.field === "taskCustomerVerified" ||
                                  column.field === "taskAgentVerified" ? (
                                    <Checkbox checked={value} />
                                  ) : (
                                    value
                                  )}
                                </TableCell>
                              );
                              }
                          })}
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>

        {openCheckListDialog && (
          <CheckListModal
            type={type}
            open={openCheckListDialog}
            handleClose={closeCheckListDialog}
            handleSubmit={saveCheckList}
          />
        )}
      </>
      )
     }
     else{
      return(
        <>
        <Grid container spacing={3}>
          <SectionWithTitle title={"Collection Checklist"}></SectionWithTitle>
          <Grid item xs={12}>
            <Paper sx={{ width: "100%", overflow: "hidden", minHeight:100 }}>
              <div className="button-grp">
              <Button size="small" variant="contained" disabled > Complete Checklist </Button>
              <Button size="small" variant="outlined" className="checklist-button"> Cancel Checklist </Button>
              </div>
            </Paper>
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <TableContainer sx={{ maxHeight: 600 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {checkListColumns.map((column) => (
                        <TableCell
                          key={column.field}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {checkList.CheckListDetails.map((row) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.displayOrder} >
                          {checkListColumns.map((column) => {
                            const value = row[column.field];
                            if(column.field === "actions"){
                              return (
                                <TableCell key={row.displayOrder}>
                                {  row["taskAgentVerified"] === false ?
                                 (<><Button variant="text" onClick={() => showCheckListModal(row.inputType)}>Add</Button>|
                                 <Button variant="text" onClick={() => showCheckListModal(row.inputType)}>Verify</Button></>)
                                 :(<Button variant="text" onClick={() => showCheckListModal(row.inputType)}>View  </Button>)}
                                </TableCell>
                              )
                            }
                            else{
                              return (
                                <TableCell key={column.field} align={column.align} >
                                  {column.field === "taskCustomerVerified" ||
                                  column.field === "taskAgentVerified" ? (
                                    <Checkbox checked={value} />
                                  ) : (
                                    value
                                  )}
                                </TableCell>
                              );
                              }
                          })}
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>

        {openCheckListDialog && (
          <CheckListModal
            type={type}
            open={openCheckListDialog}
            handleClose={closeCheckListDialog}
            handleSubmit={saveCheckList}
          />
        )}
      </>
      )
     }
  }
}
