import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate, createSearchParams } from "react-router-dom";
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
import { getDataWithParam, saveDataWithParam } from '../../DataService';

const columns = [
  { field: "displayOrder", label: "Sl. No", minWidth: 50 },
  { field: "name", label: "Task Name", minWidth: 100 },
  { field: "taskCustomerVerified", label: "Has Customer Verified?", minWidth: 50 },
  { field: "taskCustomerVerifiedDate", label: "Customer Verified On", minWidth: 100},
  { field: "taskAgentVerified", label: "Has Agent Verified?", minWidth: 50 },
  { field: "taskAgentVerifiedByName", label: "Verified Agent Name", minWidth: 100 },
  { field: "taskAgentVerifiedDate", label: "Agent Verification Date", minWidth: 100},
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

const formatField = (value,column) =>{
  if(value!==undefined && (column === "taskAgentVerifiedDate" || column === "taskCustomerVerifiedDate")){
   return new Date(value).toLocaleDateString();
  }
   else
   return value
} 

export default function CheckList() {
  const [searchParams] = useSearchParams();
  const [checkList, setCheckList] = useState(CHECKLIST);
  const [openCheckListDialog, setCheckListDialog] = useState(false);
  const [type,setTypeData] = useState("");
  const [contractCheckListId, setContractCheckListId] = useState("");
  const navigate = useNavigate();

  const openContract = () =>{
    navigate({ pathname:"/details", search:createSearchParams({ contractId:"a1A5i000000rrcS" }).toString()})
}
        
  const closeCheckListDialog = () => {
      setCheckListDialog(false);
  };

  const showCheckListModal = (type, contractCheckListId) => {
          setTypeData(type);
          setContractCheckListId(contractCheckListId);
          setCheckListDialog(true);
      };
          
  const getCheckListData = () => {
    var obj = { contractId: searchParams.get("contractId"),contractVersionId:searchParams.get("contractVersionId"),checkListType:searchParams.get("checkListType") }
    if (window['BackOfficePortalCtrl']) {
        getDataWithParam('BackOfficePortalCtrl', 'returnCheckListDetails', JSON.stringify(obj)).then(result => {
            setCheckList(result);
        })
    }
    }

  const updateCheckListItem = (obj) =>{
    if (window['BackOfficePortalCtrl']) {
      saveDataWithParam('BackOfficePortalCtrl', 'updateChecklistRequest', JSON.stringify(obj)).then(result => {
          if (result && result.status === 'Success') {
              getCheckListData();
          } else {
              console.log('error');
          }
          if (openCheckListDialog) {
            closeCheckListDialog();
          }
          })
        }
  }

  const saveCheckListItem = (formValue1,formValue2) => { 
    switch(type){
      case "Address" : {
       let obj = { 
        contractId: searchParams.get("contractId"),
        checkListType:type,
        contractCheckListId:contractCheckListId, 
        billingAddress:  formValue2,
        homeAddress: formValue1
      }
      updateCheckListItem(obj);
        break;
      }
      case "Date Time;Address" :{
        let obj = { 
          contractId: searchParams.get("contractId"),
          checkListType:type,
          contractCheckListId:contractCheckListId, 
          pickupAddress:  formValue1,
          pickupDetails : formValue2
        }
        updateCheckListItem(obj);
        break;
      }
      default: {
          console.log("default case");
      }
    }
  } 

    useEffect(() => {
      getCheckListData();
    },[])

    
  if(searchParams.get("checkListType") === "Pickup")
    return (
      <>
        <Grid container spacing={3}>
          <SectionWithTitle title={"Pickup Checklist"}></SectionWithTitle>
          <Grid item xs={12}>
            <Paper sx={{ width: "100%", overflow: "hidden", minHeight:100 }}>
              <div className="button-grp">
              <Button size="small" variant="contained" disabled > Complete Checklist </Button>
              <Button size="small" variant="outlined" className="checklist-button" onClick={openContract}> Cancel Checklist </Button>
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
                                 (<><Button variant="text" onClick={() => showCheckListModal(row.inputType,row.contractCheckListId)}>Add</Button>|
                                 <Button variant="text" onClick={() => showCheckListModal(row.inputType,row.contractCheckListId)}>Verify</Button></>)
                                 :(<Button variant="text" onClick={() => showCheckListModal(row.inputType,row.contractCheckListId)}>View  </Button>)}
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
                                    formatField(value,column.field)
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
            contractCheckListId={contractCheckListId}
            open={openCheckListDialog}
            handleClose={closeCheckListDialog}
            handleSubmit={saveCheckListItem}
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
              <Button size="small" variant="outlined" className="checklist-button" onClick={openContract}> Cancel Checklist </Button>
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
                                 (<><Button variant="text" onClick={() => showCheckListModal(row.inputType,row.contractCheckListId)}>Add</Button>|
                                 <Button variant="text" onClick={() => showCheckListModal(row.inputType,row.contractCheckListId)}>Verify</Button></>)
                                 :(<Button variant="text" onClick={() => showCheckListModal(row.inputType,row.contractCheckListId)}>View  </Button>)}
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
                                    formatField(value,column.field)
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
            contractCheckListId={contractCheckListId}
            open={openCheckListDialog}
            handleClose={closeCheckListDialog}
            handleSubmit={saveCheckListItem}
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
              <Button size="small" variant="outlined" className="checklist-button" onClick={openContract}> Cancel Checklist </Button>
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
                                    formatField(value,column.field)
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
            handleSubmit={saveCheckListItem}
          />
        )}
      </>
      )
     }
  }

