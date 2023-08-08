import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

function SectionWithTitle(props) {
  const { title } = props;

  return (
    <Grid
      item
      xs={12}
      sx={{
        '& .markdown': {
          py: 3,
        },
      }}
    >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Divider />
      {props.children}
    </Grid>
  );
}

export default SectionWithTitle;