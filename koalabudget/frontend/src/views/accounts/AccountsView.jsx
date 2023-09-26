import React, { useState, useEffect} from 'react';
import AccountsTable from './accountsTable/AccountsTable';
import { getAccounts } from '../global/apiRequests/account';
import CollapsibleTable from './accountsTable/CollapsibleTable';
import AccountsPostForm from './AccountsPostForm';

function AccountsView() {
    const [accounts, setAccounts] = useState()
    
    useEffect(() => {
      getAccounts(setAccounts);
      
    }, [])
    
    // const balance_accounts = accounts?.filter(row => row.onBalanceSheet === true)
    // const profit_accounts = accounts?.filter(row => row.onBalanceSheet === false)
  return (
    <div>
        {/* <h1>Balance Sheet Accounts</h1> */}
        <AccountsPostForm title="Here is my title"/>
        <AccountsTable accounts={accounts}/>
        {/* <h1>Profit Accounts</h1>
        <AccountsTable accounts={profit_accounts}/> */}
        {/* <CollapsibleTable/> */}
    </div>
  )
}

export default AccountsView