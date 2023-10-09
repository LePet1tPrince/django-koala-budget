import React, { useState, useEffect} from 'react';
import AccountsTable from './accountsTable/AccountsTable';
import { getAccounts, deleteAccount } from '../global/apiRequests/account';
import CollapsibleTable from './accountsTable/CollapsibleTable';
import AccountsPostForm from './accountsTable/AccountsPostForm';
import AccountDeleteDialogue from './accountsTable/AccountDeleteDialogue';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import useFetch from '../global/apiRequests/useFetch';
import AccountsPutForm from './accountsTable/AccountsPutForm';


function AccountsView() {
    // const [accounts, setAccounts] = useState();
    const [ accounts, setAccounts, isAccountsLoading, isAccountsError] = useFetch(`/accounts/`)

    const [selectedAccountId, setSelectedAccountId] = useState([]);
    const [snackbarData, setSnackbarData] = useState({
      isOpen: false,
      severity: 'info',
      message: ''
    })
    

    
  return (
    <div>
        <h1>Accounts</h1>
        {isAccountsLoading? <div>...Loading...</div>:
        isAccountsError? <div>ERROR</div> :
        <>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <AccountsPostForm setAccounts={setAccounts} accounts={accounts}/>
          </Grid>
          <Grid item xs={4}>
            <AccountDeleteDialogue
          selectedAccountId={selectedAccountId}
          accounts={accounts}
          setAccounts={setAccounts}
           />
          </Grid>
          <Grid item xs={4}>
            <AccountsPutForm
          accounts={accounts}
          setAccounts={setAccounts}
          selectedAccountId={selectedAccountId}
           />
          </Grid>

        </Grid>
        <AccountsTable accounts={accounts} selectedAccountId={selectedAccountId} setSelectedAccountId={setSelectedAccountId}/>
        </>
  }

  {/* <CollapsibleTable/> */}
      
    </div>
  )
}

export default AccountsView