import Card from '@mui/material/Card';
import { CardActionArea } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import React from 'react';
import { Typography } from '@mui/material';

function AccountCard(props) {
    const { accounts,
    setActiveAccountId } = props;

    function handleAccountSelect(e, account) {
      setActiveAccountId(prev => {
        prev.set("activeAccountId", account.id)
        return prev}, {replace: true});
        console.log("clicked!", e.target.value)

    }

  return (
    <div>{ accounts ? accounts.map((item) => {
        if (item.inBankFeed) {
        return <Card 
        // Turn this into a good card with Account name, account number, account balance
       
        key={item.id}
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        onClick={ e => handleAccountSelect(e, item)}
        >
            <CardActionArea>
              <CardHeader title={`${item.name} - ${item.num}`}/>

          <CardContent>
        
            <Typography variant="h4" sx={{ mb: 1.5 }}>Balance: ${item.balance} </Typography>
            </CardContent>
            </CardActionArea>
            </Card>
    } else {
      return null
    }
  }): null}</div>
  )
}

export default AccountCard