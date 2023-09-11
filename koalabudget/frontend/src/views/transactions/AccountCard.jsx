import React from 'react';
import Box from '@mui/material/Box';
import BasicCard from './BasicCard';
import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';




function AccountCard(props) {
    const { transactions,
    accounts,
    setActiveAccount } = props;

    function handleAccountSelect(e, account) {
      setActiveAccount(account.id);
        console.log("clicked!", e.target.value)

    }

  return (
    <div>{ accounts ? accounts.map((item) => {
        if (item.attributes.hasBankFeed) {
        return <Card 
        // Turn this into a good card with Account name, account number, account balance
       
        key={item.id}
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        onClick={ e => handleAccountSelect(e, item)}
        >
            <CardActionArea>
              <CardHeader title={`${item.attributes.Name} - ${item.attributes.Number}`}/>
                {/* <Typography variant="h2" gutterBottom>{item.attributes.Name}</Typography> */}

              {/* </CardHeader> */}
          <CardContent>
        
            <Typography variant="h3" sx={{ mb: 1.5 }}>${item.attributes.Balance}</Typography>
            {/* <Typography variant="h3" sx={{ mb: 1.5 }}>{item.attributes.Number}</Typography> */}
            </CardContent>
            </CardActionArea>
            </Card>
    }}): null}</div>
  )
}

export default AccountCard