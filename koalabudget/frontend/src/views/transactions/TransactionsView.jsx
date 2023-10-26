import React, { useState } from 'react'

import AccountCard from './accountCards/AccountCard';
import CreateMultipleTransactions from './transactionsTable/CreateMultipleTransactions.jsx';
import Grid from '@mui/material/Grid';
import ReconcileTransactions from './ReconcileTransactions';
import TransactionDataTable from './transactionsTable/TransactionDataTable.jsx';
import TransactionPost from './transactionForm/TransactionPost';
import TransactionToggle from './TransactionToggle';
import TransactionUpdate from './transactionForm/TransactionUpdate';
import TransactionsDeleteDialog from './transactionsTable/TransactionsDeleteDialog.jsx';
import Typography from '@mui/material/Typography';
import useFetch from '../global/customHooks/useFetch.js';
import { useSearchParams } from "react-router-dom";

function TransactionsView() {
    const [selectedTransactionIds, setSelectedTransactionIds] = useState([]) 
    const [alignment, setAlignment] = useState('categorized')
    
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
          <Grid item xs={2}>


        <TransactionPost
        accounts={accounts}
        activeAccountId={activeAccountId}
        setTransactions={setTransactions}
        />
        </Grid>
          
        <Grid item xs={3}>
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
          <Grid item xs={2}>
            <TransactionUpdate
            accounts={accounts}
            activeAccountId={activeAccountId}
            setTransactions={setTransactions}
            selectedTransactionIds={selectedTransactionIds}
            transactions={transactions}
            />
          </Grid>
          <Grid item xs={2}>

            <ReconcileTransactions
              alignment={alignment}
            accounts={accounts}
            setAccounts={setAccounts}
            activeAccountId={activeAccountId}
            setTransactions={setTransactions}
            selectedTransactionIds={selectedTransactionIds}
            transactions={transactions}
            />
          </Grid>

          </Grid>
          <TransactionToggle alignment={alignment} setAlignment={setAlignment}/>  
          {alignment === "categorized"?
        <TransactionDataTable 
        transactions={transactions}
        selectedTransactionIds={selectedTransactionIds}
        setSelectedTransactionIds={setSelectedTransactionIds}
        activeAccountId={activeAccountId}
        alignment={alignment}
         />:
         <TransactionDataTable 
        transactions={transactions}
        selectedTransactionIds={selectedTransactionIds}
        setSelectedTransactionIds={setSelectedTransactionIds}
        activeAccountId={activeAccountId} 
        alignment={alignment}
         />
         }
         </>
         }
      
    
    </div>
  )
}

export default TransactionsView