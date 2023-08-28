import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function CheckListModal({ open, handleClose }) {
  console.log("outlined-required");
  // <Box
  //   component="form"
  //   sx={{
  //     "& .MuiTextField-root": { m: 1, width: "25ch" },
  //   }}
  //   noValidate
  //   autoComplete="off"
  // >
  //   <div>
  //     <TextField
  //       required
  //       id="outlined-required"
  //       label="Required"
  //       defaultValue="Hello World"
  //     />
  //     <TextField
  //       disabled
  //       id="outlined-disabled"
  //       label="Disabled"
  //       defaultValue="Hello World"
  //     />
  //     <TextField
  //       id="outlined-password-input"
  //       label="Password"
  //       type="password"
  //       autoComplete="current-password"
  //     />
  //   </div>
  //   <div>
  //     <TextField
  //       id="filled-password-input"
  //       label="Password"
  //       type="password"
  //       autoComplete="current-password"
  //       variant="filled"
  //     />
  //     <TextField
  //       id="filled-read-only-input"
  //       label="Read Only"
  //       defaultValue="Hello World"
  //       InputProps={{
  //         readOnly: true,
  //       }}
  //       variant="filled"
  //     />
  //   </div>
  //   <div>
  //     <TextField
  //       required
  //       id="standard-required"
  //       label="Required"
  //       defaultValue="Hello World"
  //       variant="standard"
  //     />
  //     <TextField
  //       id="standard-search"
  //       label="Search field"
  //       type="search"
  //       variant="standard"
  //     />
  //     <TextField
  //       id="standard-helperText"
  //       label="Helper text"
  //       defaultValue="Default Value"
  //       helperText="Some important text"
  //       variant="standard"
  //     />
  //   </div>
  // </Box>

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Subscribe</Button>
      </DialogActions>
    </Dialog>
  );
}
