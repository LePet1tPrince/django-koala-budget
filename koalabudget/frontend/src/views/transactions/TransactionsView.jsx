import React, { useState, useEffect } from 'react'
// import apiKey from '../../apiKey';
import TransactionsTable from './transactionsTable/TransactionsTable.jsx';
import AccountCard from './AccountCard';
// import TemplateTransactionTable from './transactionsTable/TemplateTransactionTable'
import { getTransactions, getTransactionsByAccount, postTransaction, postTransactions } from '../global/apiRequests/transaction';
import { getAccounts } from '../global/apiRequests/account';
import { useSearchParams } from "react-router-dom";
import TransactionPoster from './TransactionPoster.jsx';




function TransactionsView() {
    const [transactions, setTransactions] = useState();
    const [accounts, setAccounts] = useState();
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

    

    
   

    
  return (
    <div>
      <h1>Active Account: {accounts?.find( account => account.id === activeAccountId).name}</h1>
        <br/>
        <AccountCard transactions={transactions} accounts={accounts} setActiveAccountId={setSearchParams}/>
        {/* <Button onClick={toggleTransactionForm}>+ New Transaction</Button> */}
        <TransactionsTable transactions={transactions}
         activeAccountId={activeAccountId} 
         />
        <TransactionPoster/>

    
    </div>
  )
}

export default TransactionsView