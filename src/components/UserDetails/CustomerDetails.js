import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

export default function CustomerDetails({details}) {
    const {
        contractNumber,
        contractType,
        customerName,
        customerId,
        status,
        renewalType,
        mobile,
        email,
        contractStartDate='',
        contractEndDate=''
    } = details
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} className='customer-section'>
                <Paper>
                    <Grid item container xs={12} className='customer-details'>
                        <Grid item xs={4} className='cus-block'>
                            <div className='cus-label'>Contract Id</div>
                            <div className='cus-val'>{contractNumber}</div>
                        </Grid>
                        <Grid item xs={4} className='cus-block'>
                            <div className='cus-label'>Contract Type</div>
                            <div className='cus-val'>{contractType}</div>
                        </Grid>
                        <Grid item xs={4} className='cus-block'>
                            <div className='cus-label'>Status</div>
                            <div className='cus-val'>{status}</div>
                        </Grid>
                        <Grid item xs={4} className='cus-block'>
                            <div className='cus-label'>Renewal Frequency</div>
                            <div className='cus-val'>{renewalType}</div>
                        </Grid>
                        <Grid item xs={4} className='cus-block'>
                            <div className='cus-label'>Contract Start Date</div>
                            <div className='cus-val'>{contractStartDate}</div>
                        </Grid>
                        <Grid item xs={4} className='cus-block'>
                            <div className='cus-label'>Contract End Date</div>
                            <div className='cus-val'>{contractEndDate}</div>
                        </Grid>
                        <Grid item xs={4} className='cus-block'>
                            <div className='cus-label'>Customer ID</div>
                            <div className='cus-val'>{customerId}</div>
                        </Grid>
                        <Grid item xs={4} className='cus-block'>
                            <div className='cus-label'>Customer Name</div>
                            <div className='cus-val'>{customerName}</div>
                        </Grid>
                        {/* <Grid item xs={4} className='cus-block'>
                            <div className='cus-label'>Customer Phone</div>
                            <div className='cus-val'>{mobile}</div>
                        </Grid> */}
                        <Grid item xs={4} className='cus-block'>
                            <div className='cus-label'>Customer Email</div>
                            <div className='cus-val'>{email}</div>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}