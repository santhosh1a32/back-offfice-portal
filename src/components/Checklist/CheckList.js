import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Button, Divider, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import SectionWithTitle from "../common/SectionWithTitle";
import "./CheckList.scss";
import CheckListModal from "./CheckListModal";
import { CHECKLIST } from "./checklistMockData";
import { Link } from "react-router-dom";

const columns = [
  { field: "displayOrder", label: "Sl. No", minWidth: 50 },
  { field: "name", label: "Task Name", minWidth: 100 },
  {
    field: "taskCustomerVerified",
    label: "Has Customer Verified?",
    minWidth: 50,
    format: (params) => {
      params.toString();
    },
  },
  {
    field: "taskCustomerVerifiedDate",
    label: "Customer Verified On",
    minWidth: 100,
  },
  {
    field: "taskAgentVerified",
    label: "Has Agent Verified?",
    minWidth: 50,
    format: (params) => {
      params.toString();
    },
  },
  {
    field: "taskAgentVerifiedByName",
    label: "Verified Agent Name",
    minWidth: 100,
  },
  {
    field: "taskAgentVerifiedDate",
    label: "Agent Verification Date",
    minWidth: 100,
  },
//   { field: "actions", 
//     label: "Actions", 
//     minWidth: 100,
//     format:(params) => { 
//         <React.Fragment>
//           <Button variant="outlined">View</Button>
//           <Button variant="outlined">Edit</Button>
//           <Button variant="outlined">Verify</Button>
//         </React.Fragment>;
//     } },
];

export default function CheckList() {
    const [checkList, setCheckList] = useState(CHECKLIST);
    const [openCheckListDialog, setCheckListDialog] = React.useState(false);
    
        
    const closeCheckListDialog = () => {
        setCheckListDialog(false);
    };

    const showCheckListModal = () => {
            setCheckListDialog(true);
        };

    useEffect(() => {}, []);

    return (
      <React.Fragment>
        <Grid container spacing={3}>
          {/* <Typography variant="h6" gutterBottom>
          {"Pickup Checklist"}
        </Typography> */}
          <SectionWithTitle title={"Pickup Checklist"}></SectionWithTitle>
          <Grid item xs={12}>
            <Paper>
              <Button
                size="small"
                variant="contained"
                className="checklist-button"
                disabled
                // onClick={() => }
              >
                Complete Checklist
              </Button>
              <Button
                size="small"
                variant="outlined"
                className="checklist-button"

                // onClick={() => }
              >
                Cancel Checklist
              </Button>
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
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {checkList.CheckListDetails.map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.displayOrder}
                        >
                          {columns.map((column) => {
                            const value = row[column.field];
                            return (
                              <TableCell
                                key={column.field}
                                align={column.align}
                              >
                                {/* {row[taskStatus] !== Verified ? <Button/>:(value)} */}
                                {column.field === "taskCustomerVerified" ||
                                column.field === "taskAgentVerified" ? (
                                  <Checkbox checked={value} />
                                ) : (
                                  value
                                )}
                              </TableCell>
                              /**   { column.field === "actions"?<TableCell key={column.field} align={column.align}>
                              {<Button variant="outlined">View</Button>
                              }
                            </TableCell>
                             }> */
                              // {column.type?(<TableCell>Downlaod</TableCell>):(<TableCell key={column.field} align={column.align}>{column.format ? column.format(row) : value}</TableCell>)}
                            );
                          })}
                          <TableCell sx={{ minWidth: 100 }}>
                            <Link onClick={() => showCheckListModal(true)}>
                              View
                            </Link>
                            |<Link>Edit</Link>|<Link>Verify</Link>
                          </TableCell>
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
            open={openCheckListDialog}
            handleClose={closeCheckListDialog}
          />
        )}
      </React.Fragment>
    );
}
