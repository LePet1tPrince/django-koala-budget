import React, { useMemo, useState } from 'react'
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
import UpdateMultiple from './transactionForm/UpdateMultiple';
import useFetch from '../global/customHooks/useFetch.js';
import { useSearchParams } from "react-router-dom";

function TransactionsView() {
    const [selectedTransactionIds, setSelectedTransactionIds] = useState([]) 
    const [alignment, setAlignment] = useState(alignmentToggle.CATEGORIZED)
    const [searchText, setSearchText] = useState('');

    
    const [searchParams, setSearchParams] = useSearchParams({activeAccountId: 5})
    const activeAccountId = parseInt(searchParams.get("activeAccountId"))
    const [ transactions, setTransactions, isTransactionsLoading, isTransactionsError] = useFetch(`/transactions/accounts/${activeAccountId}`)
    const [ accounts, setAccounts, isAccountsLoading, isAccountsError] = useFetch(`/accounts/`)

    const searchedTransactions = useMemo(() =>{
      return searchText === ""? transactions : transactions.filter(trxn => JSON.stringify(trxn).toLowerCase().includes(searchText.toLowerCase()))

    }, [transactions, searchText])

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
            selectedTransactionIds.length < 2?
            <TransactionUpdate
            accounts={accounts}
            activeAccountId={activeAccountId}
            setTransactions={setTransactions}
            selectedTransactionIds={selectedTransactionIds}
            setSelectedTransactionIds={setSelectedTransactionIds}
            transactions={transactions}
            />:
            <UpdateMultiple
            accounts={accounts}
            activeAccountId={activeAccountId}
            setTransactions={setTransactions}
            selectedTransactionIds={selectedTransactionIds}
            setSelectedTransactionIds={setSelectedTransactionIds}
            transactions={transactions}
            />
            :null
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
            searchText={searchText}
            setSearchText={setSearchText}
            // transactions={transactions}
            // setTransactions={setTransactions}
            // initialTransactions={}
              
            />
          </Grid>

          </Grid>
          <TransactionToggle alignment={alignment} setAlignment={setAlignment}/>  
          {alignment === alignmentToggle.CATEGORIZED?
          //categorized table
        <TransactionDataTable 
        // transactions={transactions}
        transactions={searchedTransactions}
        selectedTransactionIds={selectedTransactionIds}
        setSelectedTransactionIds={setSelectedTransactionIds}
        activeAccountId={activeAccountId}
        alignment={alignment}
         />:
         //reconciled transactions
         <TransactionDataTable 
        // transactions={transactions}
        transactions={searchedTransactions}
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