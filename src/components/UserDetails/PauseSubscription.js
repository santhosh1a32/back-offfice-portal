import * as React from 'react';
import CustomDatePicker from '../common/CustomDatePicker';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';

const PauseSubscription = ({ showConfirm }) => {
    const [startDate, updateStartDate] = React.useState();
    const [endDate, updateEndDate] = React.useState();
    const changeDate = (type, val) => {
        if (type === 'start') {
            updateStartDate(val)
        }
        if (type === 'end') {
            updateEndDate(val)
        }
    }
    return (
        <React.Fragment>
            {!showConfirm && (
                <React.Fragment>
                    <Typography gutterBottom>
                        Please choose a start date to pause the subscription.
                    </Typography>
                    <CustomDatePicker
                        label="Start Date"
                        value={startDate}
                        onChangeHandler={(val) => changeDate('start', val)}
                    />
                    <CustomDatePicker
                        label="End Date"
                        value={endDate}
                        onChangeHandler={(val) => changeDate('end', val)}
                    />
                </React.Fragment>
            )}
            {showConfirm && (
                <Typography gutterBottom>
                    Your Subscription will be paused from {dayjs(startDate).format('DD/MM/YYYY')} . Please confirm to proceed.
                </Typography>
            )}

        </React.Fragment>
    )
}

export default PauseSubscription
