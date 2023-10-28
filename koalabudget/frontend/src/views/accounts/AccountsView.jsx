import React, { useState } from 'react';

import AccountDeleteDialogue from './accountsTable/AccountDeleteDialogue';
import AccountPost from './accountsForm/AccountPost';
import AccountUpdate from './accountsForm/AccountUpdate';
import AccountsPostForm from './archive/AccountsPostForm';
import AccountsPutForm from './archive/AccountsPutForm';
import AccountsTable from './accountsTable/AccountsTable';
import Grid from '@mui/material/Grid';
import useFetch from '../global/customHooks/useFetch';

function AccountsView() {
    const [ accounts, setAccounts, isAccountsLoading, isAccountsError] = useFetch(`/accounts/`)
  const [ accountSubTypes, setAccountSubTypes, isSubAccountsLoading, isSubAccountsError] = useFetch(`/sub-accounts/`)


    const [selectedAccountId, setSelectedAccountId] = useState([]);

    

    
  return (
    <div>
        <h1>Accounts</h1>
        {isAccountsLoading? <div>...Loading...</div>:
        isAccountsError? <div>ERROR</div> :
        <>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <AccountPost
            setAccounts={setAccounts} 
            accounts={accounts}
            accountSubTypes={accountSubTypes}
            />
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
            <AccountUpdate
          accounts={accounts}
          setAccounts={setAccounts}
          selectedAccountId={selectedAccountId}
          accountSubTypes={accountSubTypes}
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