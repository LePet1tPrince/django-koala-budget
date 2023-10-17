import React, { useState } from 'react';

import AccountDeleteDialogue from './accountsTable/AccountDeleteDialogue';
import AccountsPostForm from './accountsTable/AccountsPostForm';
import AccountsPutForm from './accountsTable/AccountsPutForm';
import AccountsTable from './accountsTable/AccountsTable';
import Grid from '@mui/material/Grid';
import useFetch from '../global/customHooks/useFetch';

function AccountsView() {
    const [ accounts, setAccounts, isAccountsLoading, isAccountsError] = useFetch(`/accounts/`)

    const [selectedAccountId, setSelectedAccountId] = useState([]);

    

    
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
          setSelectedAccountId={setSelectedAccountId}
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