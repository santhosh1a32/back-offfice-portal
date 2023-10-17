import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
// import Chart from './Chart';
// import Deposits from './Deposits';
import Orders from './Orders';
import SearchCustomer from '../SearchCustomer/SearchContact';
import { getDataWithParam } from '../../DataService';

const Home = () => {
    const[allContractDetails,setAllContractDetails] = React.useState([]);

    React.useEffect(() =>{
        var obj = { contractId: '' }
        if (window['BackOfficePortalCtrl']) {
            getDataWithParam('BackOfficePortalCtrl', 'getAllContracts',JSON.stringify(obj)).then(result => {
                console.log('Get All Contracts details' , result, '<=========');
                if(result && result.allContractDetails) {
                    setAllContractDetails(result.allContractDetails);
                }
            })
        }
    },[])

    return (
        <Grid container spacing={3}>
            {/* Chart */}
            {/* <Grid item xs={12} md={8} lg={9}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 240,
                    }}
                >
                    <Chart />
                </Paper>
            </Grid> */}
            {/* Recent Deposits */}
            {/* <Grid item xs={12} md={4} lg={3}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 240,
                    }}
                >
                    <Deposits />
                </Paper>
            </Grid> */}
            {/* Recent Orders */}
            <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <SearchCustomer />
                    <Orders allContractDetails={allContractDetails}/>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Home