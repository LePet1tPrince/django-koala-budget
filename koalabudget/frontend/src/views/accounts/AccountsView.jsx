import React, { useState, useEffect} from 'react';
import AccountsTable from './accountsTable/AccountsTable';
import { getAccounts, deleteAccount } from '../global/apiRequests/account';
import CollapsibleTable from './accountsTable/CollapsibleTable';
import AccountsPostForm from './AccountsPostForm';
import Button from '@mui/material/Button';
import SimpleSnackbar from '../global/SimpleSnackbar';


function AccountsView() {
    const [accounts, setAccounts] = useState();
    const [selectedAccounts, setSelectedAccounts] = useState([]);
    const [snackbarData, setSnackbarData] = useState({
      isOpen: false,
      severity: 'info',
      message: ''
    })
    
    useEffect(() => {
      getAccounts(setAccounts);
      
    }, [])

    async function handleDelete() {
      const response = await deleteAccount(selectedAccounts[0])
      if (response.status === 204) {
        setSnackbarData({
          message: "Account Deleted",
          severity: 'success',
          isOpen: true
      })
        // const responsejson = await response.json()

    } else {
          setSnackbarData({
          message: "Error " + response.status + ' - ' + response.statusText,
          severity: 'error',
          isOpen: true
        })}
      console.log(response.status)
    }

    const DeleteButton = () => {
      if (selectedAccounts.length === 1 ) {
        return <Button
         variant='contained'
          color='error'
          onClick={handleDelete}
          >Delete Selected Account</Button>
        
      }
    }


    
    // const balance_accounts = accounts?.filter(row => row.onBalanceSheet === true)
    // const profit_accounts = accounts?.filter(row => row.onBalanceSheet === false)
  return (
    <div>
        <h1>Accounts</h1>
        <AccountsPostForm setAccounts={setAccounts} accounts={accounts}/>
        <DeleteButton/>
        {/* <Button variant='contained' color='error'>Delete Selected Accounts</Button> */}
        <AccountsTable accounts={accounts} selectedAccounts={selectedAccounts} setSelectedAccounts={setSelectedAccounts}/>
        <SimpleSnackbar snackbarData={snackbarData} setSnackbarData={setSnackbarData} />

        {/* <h1>Profit Accounts</h1>
        <AccountsTable accounts={profit_accounts}/> */}
        {/* <CollapsibleTable/> */}
    </div>
  )
}

export default AccountsView