import React, { useState, useEffect } from 'react'
// import apiKey from '../../apiKey';
import TransactionsTable from './transactionsTable/TransactionsTable.jsx';
import AccountCard from './AccountCard';
// import TemplateTransactionTable from './transactionsTable/TemplateTransactionTable'
import { getTransactions, getTransactionsByAccount, postTransaction, postTransactions } from '../global/apiRequests/transaction';
import { getAccounts } from '../global/apiRequests/account';
import { useSearchParams } from "react-router-dom";
import { Button } from '@mui/material';
import TransactionPoster from '../../archive/TransactionPoster.jsx';
import SimpleSnackbar from '../global/SimpleSnackbar.jsx';




function TransactionsView() {
    const [transactions, setTransactions] = useState();
    const [accounts, setAccounts] = useState();
    const [isTransactionForm, setIsTransactionForm] = useState(false) 
    // const [activeAccountId, setActiveAccountId] = useState();
    const [searchParams, setSearchParams] = useSearchParams({activeAccountId: 5})
    const activeAccountId = parseInt(searchParams.get("activeAccountId"))

    useEffect(() => {
        
        getAccounts(setAccounts);
        // setActiveAccountId(5);

    },[])

    useEffect(() => {
      if (activeAccountId){
        getTransactionsByAccount(setTransactions, activeAccountId);
        
      }
    },[activeAccountId])

    function toggleTransactionForm() {
      setIsTransactionForm(!isTransactionForm)

    }

    
   

    
  return (
    <div>
      <h1>Active Account: {accounts?.find( account => account.id === activeAccountId).name}</h1>
        <br/>
        <AccountCard 
        transactions={transactions} 
        accounts={accounts} 
        setActiveAccountId={setSearchParams}
        setIsTransactionForm={setIsTransactionForm}
        />
        <Button onClick={toggleTransactionForm}>+ New Transaction</Button>
        {/* {JSON.stringify(isTransactionForm)} */}
        <TransactionsTable transactions={transactions}
         setTransactions={setTransactions}
         activeAccountId={activeAccountId} 
         isTransactionForm={isTransactionForm}
         accounts={accounts}
         />

    
    </div>
  )
}

export default TransactionsView