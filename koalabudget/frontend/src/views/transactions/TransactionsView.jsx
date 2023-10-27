import React, { useState } from 'react'
import TransactionToggle, { alignmentToggle } from './TransactionToggle';

import AccountCard from './accountCards/AccountCard';
import AccountCardContainer from './accountCards/AccountCardContainer';
import CreateMultipleTransactions from './transactionsTable/CreateMultipleTransactions.jsx';
import Grid from '@mui/material/Grid';
import ReconcileTransactions from './ReconcileTransactions';
import TransactionDataTable from './transactionsTable/TransactionDataTable.jsx';
import TransactionPost from './transactionForm/TransactionPost';
import TransactionSearch from './transactionsTable/TransactionSearch';
import TransactionUpdate from './transactionForm/TransactionUpdate';
import TransactionsDeleteDialog from './transactionsTable/TransactionsDeleteDialog.jsx';
import Typography from '@mui/material/Typography';
import useFetch from '../global/customHooks/useFetch.js';
import { useSearchParams } from "react-router-dom";

function TransactionsView() {
    const [selectedTransactionIds, setSelectedTransactionIds] = useState([]) 
    const [alignment, setAlignment] = useState(alignmentToggle.CATEGORIZED)
    
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
         <AccountCardContainer
         accounts={accounts} 
         activeAccountId={activeAccountId}
         setActiveAccountId={setSearchParams}/>


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
          {alignment === alignmentToggle.CATEGORIZED?

          <TransactionsDeleteDialog
          selectedTransactionIds={selectedTransactionIds}
          transactions={transactions}
          setTransactions={setTransactions}
           />: null}
          </Grid>
          <Grid item xs={2}>
            {alignment === alignmentToggle.CATEGORIZED?
            <TransactionUpdate
            accounts={accounts}
            activeAccountId={activeAccountId}
            setTransactions={setTransactions}
            selectedTransactionIds={selectedTransactionIds}
            transactions={transactions}
            />:null
          }
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
          <Grid item xs={4}>
            <TransactionSearch
            transactions={transactions}
            setTransactions={setTransactions}
            // initialTransactions={}
              
            />
          </Grid>

          </Grid>
          <TransactionToggle alignment={alignment} setAlignment={setAlignment}/>  
          {alignment === alignmentToggle.CATEGORIZED?
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