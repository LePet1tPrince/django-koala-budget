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




function TransactionsView() {
    // const [transactions, setTransactions] = useState();
    // const [accounts, setAccounts] = useState();
    const [isTransactionForm, setIsTransactionForm] = useState(false) 
    const [selectedTransactions, setSelectedTransactions] = useState([]) 
    
    // const [activeAccountId, setActiveAccountId] = useState();
    const [searchParams, setSearchParams] = useSearchParams({activeAccountId: 5})
    const activeAccountId = parseInt(searchParams.get("activeAccountId"))
    const [ transactions, setTransactions, isTransactionsLoading, isTransactionsError] = useFetch(`/transactions/accounts/${activeAccountId}`)
    const [ accounts, setAccounts, isAccountsLoading, isAccountsError] = useFetch(`/accounts/`)

    // useEffect(() => {
        
    //     getAccounts(setAccounts);

    // },[])


    function toggleTransactionForm() {
      setIsTransactionForm(!isTransactionForm)

    }

    const DeleteButton = () => {
      if (selectedTransactions.length === 1 ) {
        return <TransactionsDeleteDialog
          selectedTransactions={selectedTransactions}
          transactions={transactions}
          setTransactions={setTransactions}
           />
        
      }
    }
    
   

    
  return (
    <div>
      <h1>Active Account: {accounts?.find( account => account.id === activeAccountId).name}</h1>
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
       
        <TransactionsPostForm
        accounts={accounts}
        setAccount={setAccounts}
        activeAccountId={activeAccountId}
        setTransactions={setTransactions}
        />
        
        <DeleteButton/>

        <TransactionDataTable transactions={transactions}
        selectedTransactions={selectedTransactions}
        setSelectedTransactions={setSelectedTransactions}
        activeAccountId={activeAccountId} 
  
         />
         </>
         }
      
    
    </div>
  )
}

export default TransactionsView