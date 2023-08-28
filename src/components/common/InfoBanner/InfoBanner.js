import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import './infoBanner.scss';

export default function InfoBanner({severity='warning', message=''}) {
    return (
        <Stack className='custom-info' sx={{ width: '100%' }} spacing={2}>
            <Alert className='info-alert' severity={severity}>{message}</Alert>
        </Stack>
    )
}