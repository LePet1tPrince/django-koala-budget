import React, { useState, useEffect } from 'react'
// import apiKey from '../../apiKey';
import TransactionsTable from './transactionsTable/TransactionsTable.jsx';
import AccountCard from './AccountCard';
// import TemplateTransactionTable from './transactionsTable/TemplateTransactionTable'
import { getTransactions, getTransactionsByAccount, postTransaction, postTransactions } from '../global/apiRequests/transaction';
import { getAccounts } from '../global/apiRequests/account';


function TransactionsView() {
    const [transactions, setTransactions] = useState();
    const [accounts, setAccounts] = useState();
    const [activeAccountId, setActiveAccountId] = useState();

    useEffect(() => {
        
        getAccounts(setAccounts);
        setActiveAccountId(5);

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
        <AccountCard transactions={transactions} accounts={accounts} setActiveAccountId={setActiveAccountId}/>
        <TransactionsTable transactions={transactions}
         activeAccountId={activeAccountId} 
         />


    
    </div>
  )
}

export default TransactionsView