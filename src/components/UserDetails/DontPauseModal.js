import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function DontPauseModal({ open, handleClose, handleSubmit }) {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle sx={{ m: 0, p: 2 }}>
                Don't Pause
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <React.Fragment>
                    <DialogContentText>
                        This action will suspend the earlier pause request. Please confirm.
                    </DialogContentText>
                </React.Fragment>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
                <Button onClick={handleSubmit}>Confirm</Button>
            </DialogActions>
        </Dialog>
    )
}