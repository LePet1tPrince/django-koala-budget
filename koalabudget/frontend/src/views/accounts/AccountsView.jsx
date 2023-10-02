import React, { useState, useEffect} from 'react';
import AccountsTable from './accountsTable/AccountsTable';
import { getAccounts, deleteAccount } from '../global/apiRequests/account';
import CollapsibleTable from './accountsTable/CollapsibleTable';
import AccountsPostForm from './AccountsPostForm';
import AccountDeleteDialogue from './accountsTable/AccountDeleteDialogue';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';


function AccountsView() {
    const [accounts, setAccounts] = useState();
    const [selectedAccount, setSelectedAccount] = useState([]);
    const [snackbarData, setSnackbarData] = useState({
      isOpen: false,
      severity: 'info',
      message: ''
    })
    
    useEffect(() => {
      getAccounts(setAccounts);
      
    }, [])

    // const selectedAccountObject = accounts?.filter(acc =>  (acc.id === selectedAccount[0])
    // )

    const DeleteButton = () => {
      if (selectedAccount.length === 1 ) {
        return <AccountDeleteDialogue
          selectedAccount={selectedAccount}
          accounts={accounts}
          setAccounts={setAccounts}
           />
        
      }
    }

    
  return (
    <div>
        <h1>Accounts</h1>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <AccountsPostForm setAccounts={setAccounts} accounts={accounts}/>
          </Grid>
          <Grid item xs={4}>
            <DeleteButton/>

          </Grid>

        </Grid>
        <AccountsTable accounts={accounts} selectedAccounts={selectedAccount} setSelectedAccounts={setSelectedAccount}/>

      
    </div>
  )
}

export default AccountsView