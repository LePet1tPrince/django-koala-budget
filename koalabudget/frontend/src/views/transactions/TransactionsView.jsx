import React, { useState } from 'react'

import AccountCard from './accountCards/AccountCard';
import CreateMultipleTransactions from './transactionsTable/CreateMultipleTransactions.jsx';
import Grid from '@mui/material/Grid';
import TransactionDataTable from './transactionsTable/TransactionDataTable.jsx';
import TransactionPost from './transactionPost/TransactionPost';
import TransactionUpdate from './transactionPost/TransactionUpdate';
import TransactionsDeleteDialog from './transactionsTable/TransactionsDeleteDialog.jsx';
import TransactionsPostForm from './transactionsTable/TransactionsPostForm.jsx';
import TransactionsPutForm from './transactionsTable/TransactionsPutForm.jsx';
import Typography from '@mui/material/Typography';
import useFetch from '../global/customHooks/useFetch.js';
import { useSearchParams } from "react-router-dom";

// import TemplateTransactionTable from './transactionsTable/TemplateTransactionTable'



function TransactionsView() {
    const [selectedTransactionIds, setSelectedTransactionIds] = useState([]) 
    
    // const [activeAccountId, setActiveAccountId] = useState();
    const [searchParams, setSearchParams] = useSearchParams({activeAccountId: 5})
    const activeAccountId = parseInt(searchParams.get("activeAccountId"))
    const [ transactions, setTransactions, isTransactionsLoading, isTransactionsError] = useFetch(`/transactions/accounts/${activeAccountId}`)
    const [ accounts, setAccounts, isAccountsLoading, isAccountsError] = useFetch(`/accounts/`)

  return (
    <div>
      <Typography variant="h2">Active Account: {accounts?.find( account => account.id === activeAccountId).name}</Typography>
        <br/>
        { isAccountsLoading?
        <div>...Loading...</div>:
         isAccountsError? <div>Error</div>:
         <AccountCard 
        accounts={accounts} 
        activeAccountId={activeAccountId}
        setActiveAccountId={setSearchParams}
        />
        }

        {  isTransactionsLoading?
        <div>...Loading...</div>:
         isTransactionsError? <div>Error</div>:
         <>
         <Grid container spacing={2}>
          <Grid item xs={3}>


        <TransactionPost
        accounts={accounts}
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
            {/* <TransactionsPutForm */}
            <TransactionUpdate
            accounts={accounts}
            activeAccountId={activeAccountId}
            setTransactions={setTransactions}
            selectedTransactionIds={selectedTransactionIds}
            transactions={transactions}
            />
          </Grid>

          </Grid>       
        <TransactionDataTable 
        transactions={transactions}
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