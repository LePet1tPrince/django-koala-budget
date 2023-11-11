import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import React from 'react';
import Typography from '@mui/material/Typography';

function BudgetAvailableCard(props) {
    const {} = props;

  return (
    <div>
        <Card variant="outlined" >
            <CardContent sx={{"alignItems": "center", "background": "green"}}>
                <Typography>
                    Net Worth
                </Typography>
                <Typography>
                    $40,000
                </Typography>
                <Typography>
                    Available to Budget
                </Typography>
                <Typography>
                    $50
                </Typography>
            </CardContent>
        </Card>
    </div>
  )
}

export default BudgetAvailableCard