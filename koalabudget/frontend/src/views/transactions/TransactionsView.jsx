import React, { useState, useEffect } from 'react'
// import apiKey from '../../apiKey';
import TransactionsTable from './transactionsTable/Archive/TransactionsTable.jsx';
import AccountCard from './accountCards/AccountCard';
// import TemplateTransactionTable from './transactionsTable/TemplateTransactionTable'
import { getTransactions, getTransactionsByAccount, postTransaction, postTransactions } from '../global/apiRequests/transaction';
import { getAccounts } from '../global/apiRequests/account';
import { useSearchParams } from "react-router-dom";
import { Button } from '@mui/material';
import TransactionPoster from '../../archive/TransactionPoster.jsx';
import SimpleSnackbar from '../global/SimpleSnackbar.jsx';
import TransactionDataTable from './transactionsTable/TransactionDataTable.jsx';
import TransactionsPostForm from './transactionsTable/TransactionsPostForm.jsx';
import TransactionsDeleteDialog from './transactionsTable/TransactionsDeleteDialog.jsx';
import useFetch from '../global/apiRequests/useFetch.js';
import TransactionTableView from './transactionsTable/TransactionTableView.jsx';
import CreateMultipleTransactions from './transactionsTable/CreateMultipleTransactions.jsx';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TransactionsPutForm from './transactionsTable/TransactionsPutForm.jsx';





function TransactionsView() {
    const [isTransactionForm, setIsTransactionForm] = useState(false) 
    const [selectedTransactionIds, setSelectedTransactionIds] = useState([]) 
    
    // const [activeAccountId, setActiveAccountId] = useState();
    const [searchParams, setSearchParams] = useSearchParams({activeAccountId: 5})
    const activeAccountId = parseInt(searchParams.get("activeAccountId"))
    const [ transactions, setTransactions, isTransactionsLoading, isTransactionsError] = useFetch(`/transactions/accounts/${activeAccountId}`)
    const [ accounts, setAccounts, isAccountsLoading, isAccountsError] = useFetch(`/accounts/`)



    function toggleTransactionForm() {
      setIsTransactionForm(!isTransactionForm)

    }

    
   

    
  return (
    <div>
      <Typography variant="h2">Active Account: {accounts?.find( account => account.id === activeAccountId).name}</Typography>
        <br/>
        { isAccountsLoading?
        <div>...Loading...</div>:
         isAccountsError? <div>Error</div>:
         <AccountCard 
        accounts={accounts} 
        setActiveAccountId={setSearchParams}
        setIsTransactionForm={setIsTransactionForm}
        />
        }

        {  isTransactionsLoading?
        <div>...Loading...</div>:
         isTransactionsError? <div>Error</div>:
         <>
         <Grid container spacing={2}>
          <Grid item xs={3}>


        <TransactionsPostForm
        accounts={accounts}
        setAccount={setAccounts}
        activeAccountId={activeAccountId}
        setTransactions={setTransactions}
        />
        </Grid>
          
        <Grid item xs={4}>
        <CreateMultipleTransactions 
          activeAccountId={activeAccountId}
          accounts={accounts}/>
          </Grid>
          <Grid item xs={2}>
          <TransactionsDeleteDialog
          selectedTransactionIds={selectedTransactionIds}
          transactions={transactions}
          setTransactions={setTransactions}
           />
          </Grid>
          <Grid item sx={2}>
            <TransactionsPutForm
            accounts={accounts}
            setAccount={setAccounts}
            activeAccountId={activeAccountId}
            setTransactions={setTransactions}
            selectedTransactionIds={selectedTransactionIds}
            transactions={transactions}
            />
          </Grid>

          </Grid>       
        <TransactionDataTable transactions={transactions}
        accounts={accounts}
        selectedTransactionIds={selectedTransactionIds}
        setSelectedTransactionIds={setSelectedTransactionIds}
        activeAccountId={activeAccountId} 
         />
         </>
         }
      
    
    </div>
  )
}

export default TransactionsView