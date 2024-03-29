import * as React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { DollarFormat } from '../global/apiRequests/global';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px'}}
  >
    •
  </Box>
);

export default function BalanceCard({ balances }) {
    const available = balances[0] - balances[1]
  

    
  return (
    <Card sx={{ maxWidth: 275, background: available<0? "#e36868":"#81c784" }}>
      <CardContent>
        <Typography variant="h5" component="div">
            Net Worth:
        </Typography>
        <Typography variant="h5" component="div">
            {DollarFormat.format(balances[0])}
        </Typography>
        <Typography variant="h5" component="div">
            Available for Goals:
        </Typography>
        <Typography variant="h5" component="div">
            {DollarFormat.format(available)}
        </Typography>
        

      </CardContent>
     
    </Card>
  );
}
