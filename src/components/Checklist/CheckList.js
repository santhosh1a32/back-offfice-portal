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
  const navigate = useNavigate();
  const [checkList, setCheckList] = useState(CHECKLIST);
  const [openCheckListDialog, setCheckListDialog] = useState(false);
  const [type,setTypeData] = useState("");
  const [currentSelectedRowId, setSelectedRow] = React.useState('');
  const [relatedRecordId, setRelatedRecordId] = React.useState();
  const [buttonEnable, setButtonEnable] = useState(false);

    const openContract = () =>{
      navigate({ pathname:"/details", search:createSearchParams({ contractId:"a1A5i000000rrcS" }).toString()})
    }
        
    const closeCheckListDialog = () => {
        setCheckListDialog(false);
        getCheckListData();
    };

    const showCheckListModal = (type, contractCheckListId, relatedRecordId=null) => {
            setRelatedRecordId(relatedRecordId)
            setSelectedRow(contractCheckListId)
            setTypeData(type)
            setCheckListDialog(true);
        };
          
    const getCheckListData = () => {
      var obj = { contractId: searchParams.get("contractId"),contractVersionId:searchParams.get("contractVersionId"),checkListType:searchParams.get("checkListType") }
      if (window['BackOfficePortalCtrl']) {
          let reqObj = {...obj};
          if(relatedRecordId) {
            reqObj.relatedRecordId = relatedRecordId;
          }
          getDataWithParam('BackOfficePortalCtrl', 'returnCheckListDetails', JSON.stringify(reqObj)).then(result => {
              console.log(result);
              setCheckList(result);
              checkVerified();
          })
      }
     }
     const completeCheckList = () => {
      let obj = { "completionStatus" : "Completed" }
      let contractChecklistIdList =[];
      checkList.CheckListDetails.map(checkListItem => {
          if(checkListItem.contractCheckListId)
          contractChecklistIdList.push(JSON.stringify(checkListItem.contractCheckListId));
      })
      obj["contractChecklistIdList"] = contractChecklistIdList;
      updateChecklistCompletionStatus(obj)
      }
  
    const cancelCheckList = () => {
      let obj = { "completionStatus" : "Cancelled" };
      let contractChecklistIdList =[];
      checkList.CheckListDetails.map(checkListItem => {
          if(checkListItem.taskAgentVerified === true)
          contractChecklistIdList.push(JSON.stringify(checkListItem.contractCheckListId));
      })
      obj["contractChecklistIdList"] = contractChecklistIdList;
      console.log(obj);
      updateChecklistCompletionStatus(obj);
    }
  
    const updateChecklistCompletionStatus = (obj) =>{
      if (window['BackOfficePortalCtrl']) {
        getDataWithParam('BackOfficePortalCtrl', 'updateChecklistCompletionStatusRequest', JSON.stringify(obj)).then(result => {
          openContract();
        })
    }    
    }

     const verifyCheckListItem = (contractCheckListId) => {
      let obj = { 
        contractId: searchParams.get("contractId"),
        contractVersionId:searchParams.get("contractVersionId"),
        checkListType:searchParams.get("checkListType"),
        contractChekListId:contractCheckListId,
        // relatedRecordId:,
        taskStatus:"Verified",
       }
      if (window['BackOfficePortalCtrl']) {
          getDataWithParam('BackOfficePortalCtrl', 'updateChecklistRequest', JSON.stringify(obj)).then(result => {
            if (result && result.status === 'Success') {
              console.log("success");
          } else {
              console.log('error')
          }
          })
        }
      }

      const checkVerified = () => {
        let verifiedItems = checkList.CheckListDetails.filter(item => item.taskAgentVerified === true);
        if(verifiedItems.length === checkList.CheckListDetails.length)
        setButtonEnable(true);
      }


    useEffect(() => {
      getCheckListData();
    }, [])

    if(searchParams.get("checkListType") === "Pickup")
    return (
      <>
        <Grid container spacing={3}>
          <SectionWithTitle title={"Pickup Checklist"}></SectionWithTitle>
          <Grid item xs={12}>
            <Paper sx={{ width: "100%", overflow: "hidden", minHeight:100 }}>
              <div className="button-grp">
              <Button size="small" variant="contained" disabled={!buttonEnable}  onClick={completeCheckList}> Complete Checklist </Button>
              <Button size="small" variant="outlined" className="checklist-button" onClick={cancelCheckList}> Cancel Checklist </Button>
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
                                 (<><Button variant="text" onClick={() => showCheckListModal(row.inputType, row.contractCheckListId)}>Add</Button>|
                                 <Button variant="text" onClick={() => verifyCheckListItem(row["contractCheckListId"])}>Verify</Button></>)
                                 :(<Button variant="text" onClick={() => showCheckListModal(row.inputType, row.contractCheckListId, row.relatedRecordId)}>View  </Button>)}
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
            contractCheckListId={currentSelectedRowId}
            relatedRecordId={relatedRecordId}
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
              <Button size="small" variant="contained" disabled={!buttonEnable}  onClick={completeCheckList}> Complete Checklist </Button>
              <Button size="small" variant="outlined" className="checklist-button" onClick={cancelCheckList}> Cancel Checklist </Button>
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
                                 (<><Button variant="text" onClick={() => showCheckListModal(row.inputType || row.name, row.contractCheckListId)}>Add</Button>|
                                 <Button variant="text" onClick={() => verifyCheckListItem(row["contractCheckListId"])}>Verify</Button></>)
                                 :(<Button variant="text" onClick={() => showCheckListModal(row.inputType || row.name, row.contractCheckListId, row.relatedRecordId)}>View  </Button>)}
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
            contractCheckListId={currentSelectedRowId}
            relatedRecordId={relatedRecordId}
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
              <Button size="small" variant="contained" disabled={!buttonEnable}  onClick={completeCheckList}> Complete Checklist </Button>
              <Button size="small" variant="outlined" className="checklist-button" onClick={cancelCheckList}> Cancel Checklist </Button>
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
                                 (<><Button variant="text" onClick={() => showCheckListModal(row.inputType, row.contractCheckListId)}>Add</Button>|
                                 <Button variant="text" onClick={() => verifyCheckListItem(row["contractCheckListId"])}>Verify</Button></>)
                                 :(<Button variant="text" onClick={() => showCheckListModal(row.inputType, row.contractCheckListId, row.relatedRecordId)}>View  </Button>)}
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
            contractCheckListId={currentSelectedRowId}
            relatedRecordId={relatedRecordId}
          />
        )}
      </>
      )
     }
}
