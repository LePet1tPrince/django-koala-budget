import React, { useState, useEffect} from 'react';
import AccountsTable from './accountsTable/AccountsTable';
import { getAccounts } from '../global/apiRequests/account';

function AccountsView() {
    const [accounts, setAccounts] = useState()

    useEffect(() => {
        getAccounts(setAccounts);

    }, [])

  return (
    <div>
        <h1>Accounts</h1>
        <AccountsTable accounts={accounts}/>
    </div>
  )
}

export default AccountsView