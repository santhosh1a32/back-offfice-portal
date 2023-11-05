import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate, createSearchParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Button, ButtonGroup} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import "./CheckList.scss";
import CheckListModal from "./CheckListModal";
import { CHECKLIST } from "./checklistMockData";
import SectionWithTitle from '../common/SectionWithTitle';
import { getDataWithParam } from '../../DataService';
import { Checklist } from "@mui/icons-material";

const columns = [
  { field: "displayOrder", label: "Sl. No", minWidth: 50 },
  { field: "name", label: "Task Name", minWidth: 100 },
  { field: "taskCustomerVerified", label: "Has Customer Verified?", minWidth: 50 },
  { field: "taskCustomerVerifiedDate", label: "Customer Verified On", minWidth: 100 },
  { field: "taskAgentVerified", label: "Has Agent Verified?", minWidth: 50 },
  { field: "taskAgentVerifiedByName", label: "Verified Agent Name", minWidth: 100 },
  { field: "taskAgentVerifiedDate", label: "Agent Verification Date", minWidth: 100 },
  { field: "actionLink", label: "Actions", minWidth: 100 }
];

const checkListColumns = [
  { field: "displayOrder", label: "Sl. No", minWidth: 50 },
  { field: "name", label: "Task Name", minWidth: 100 },
  { field: "taskAgentVerified", label: "Has Agent Verified?", minWidth: 50 },
  { field: "taskAgentVerifiedByName", label: "Verified Agent Name", minWidth: 100 },
  { field: "taskAgentVerifiedDate", label: "Agent Verification Date", minWidth: 100 },
  { field: "actionLink", label: "Actions", minWidth: 100 }
]

export default function CheckList() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [checkList, setCheckList] = useState(CHECKLIST.CheckListDetails);
  const [openCheckListDialog, setCheckListDialog] = useState(false);
  const [type,setTypeData] = useState("");
  const [label,setLabel] = useState("");
  const [currentSelectedRowId, setSelectedRow] = React.useState('');
  const [relatedRecordId, setRelatedRecordId] = React.useState(null);
  const [buttonEnable, setButtonEnable] = useState(false);
  const [uuidData, setUUIDData] = React.useState({});
  const upcomingContractVersionId = searchParams.get("upcomingContractVersionId");
  const [snackBarState, setSnackBarState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'right',
  });

  

    const { vertical, horizontal, open } = snackBarState;
    const handleClick = () => {
      setSnackBarState({...snackBarState, open: true });
    };

    const handleClose = () => {
      setSnackBarState({ ...snackBarState, open: false });
    };

    const openContract = () =>{
      navigate({ pathname:"/details", search:createSearchParams({ contractId:"a1A5i000000rrcS" }).toString()})
    }
        
    const closeCheckListDialog = () => {
        setCheckListDialog(false);
        getCheckListData();
    };

    const verifyCheckList = (type, label, contractCheckListId, relatedRecordId=null, row) =>{
      console.log(label,type);
      if(row.actionLink === "Verify"){
        verifyCheckListItem(contractCheckListId,row);
      }
      else{
        showCheckListModal(type, label, contractCheckListId, relatedRecordId, row);
      }
    }

    const showCheckListModal = (type, label, contractCheckListId, relatedRecordId, row) => {
            setRelatedRecordId(relatedRecordId || null);
            setSelectedRow(contractCheckListId)
            setTypeData(type)
            setLabel(label);
            setCheckListDialog(true);
            const obj = {
              checkListUUID: row.checkListUUID || null,
              contractUUID: row.contractUUID || null,
              customerUUID: row.customerUUID || null
            }
            setUUIDData(obj);
        };
          
    const getCheckListData = () => {
      var obj = { contractId: searchParams.get("contractId"),contractVersionId:searchParams.get("contractVersionId"),checkListType:searchParams.get("checkListType") }
      if (window['BackOfficePortalCtrl']) {
          let reqObj = {...obj};
          if(relatedRecordId) {
            reqObj.relatedRecordId = relatedRecordId;
          }
          getDataWithParam('BackOfficePortalCtrl', 'returnCheckListDetails', JSON.stringify(reqObj)).then(result => {
              setCheckList(result.CheckListDetails);
              
             // checkVerified();
          })
      }
     }
     const completeCheckList = () => {
      let obj = { "completionStatus" : "Completed" }
      let contractChecklistIdList =  checkList.CheckListDetails.map(checkListItem =>{
        return checkListItem.contractCheckListId?checkListItem.contractCheckListId:'';
      })
      obj["contractChecklistIdList"] = contractChecklistIdList;
      updateChecklistCompletionStatus(obj)
      }
  
    const cancelCheckList = () => {
      let obj = { "completionStatus" : "Cancelled" };
      let contractChecklistIdList =[];
      for(const checkListItem  of checkList.CheckListDetails){
        if(checkListItem.taskAgentVerified === true)
        contractChecklistIdList.push(checkListItem.contractCheckListId);
      }
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

     const verifyCheckListItem = (contractCheckListId,row) => {
      let obj = { 
        contractId: searchParams.get("contractId"),
        contractVersionId:searchParams.get("contractVersionId"),
        checkListType:searchParams.get("checkListType"),
        contractChekListId:contractCheckListId,
        upcomingContractVersionId,
        // relatedRecordId:,
        taskStatus:"Verified",
        checkListUUID: row.checkListUUID || null,
        contractUUID: row.contractUUID || null,
        customerUUID: row.customerUUID || null
       }

      if (window['BackOfficePortalCtrl']) {
          getDataWithParam('BackOfficePortalCtrl', 'updateChecklistRequest', JSON.stringify(obj)).then(result => {
            if (result && result.status === 'Success') {
              console.log("success");
			  handleClick();
          } else {
              console.log('error')
          }
          })
        }
      }

      const checkVerified = () => {
        let verifiedItems = checkList.filter(item => item.taskAgentVerified === true);
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
          {/* <SectionWithTitle title={"Pickup Checklist"}></SectionWithTitle> */}
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            onClose={handleClose}
            message="The CheckList Item is Verified!"
            key={vertical + horizontal}
          />
          {Object.keys(checkList).map((Value) => 
            <Grid item xs={12}>
            <Paper className="checklist">
            <h4>{Value.toUpperCase()}</h4>
              <div className="button-grp">
              <Button size="small" variant="contained" disabled={!buttonEnable}  onClick={completeCheckList} className="checklist-conmplete"> Complete </Button>
              {/* <Button size="small" variant="contained" disabled={this.checkVerified()} onClick={completeCheckList} className="checklist-conmplete"> Complete </Button> */}
              <Button size="small" variant="outlined" onClick={cancelCheckList}> Cancel  </Button>
              </div>
           
           
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                      <TableRow>
                        {columns.map((column) => (
                          <TableCell
                            key={column.field}
                            align="left"
                            style={{ minWidth: column.minWidth }}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                    {checkList[Value].map((row,idx) => (
                       <TableRow hover role="checkbox" tabIndex={-1} key={Value + idx}>
                         {columns.map((column,index) => {
                           return (
                           <TableCell key={Value+index+column.field}  align="left">
                           {column.field === "taskCustomerVerified" ||
                           column.field === "taskAgentVerified" ? (
                             <Checkbox disabled checked={row[column.field]} />
                           ) : ( column.field === "actionLink"?<Button onClick={() => verifyCheckList(row.inputType, row.label, row.contractCheckListId, row.relatedRecordId, row)}>{row[column.field]}</Button>:
                            row[column.field] 
                           )
                          }
                         </TableCell>
                        )})} 
                       </TableRow>
                    ))}
                    </TableBody>
                  </Table>
                </TableContainer>
            </Paper>
            </Grid>
          )}         
        </Grid>

        {openCheckListDialog && (
          <CheckListModal
            type={type}
            label={label}
            open={openCheckListDialog}
            handleClose={closeCheckListDialog}
            contractCheckListId={currentSelectedRowId}
            relatedRecordId={relatedRecordId}
            uuidData={uuidData}
            upcomingContractVersionId={upcomingContractVersionId}
          />
        )}
      </>
    );
}
