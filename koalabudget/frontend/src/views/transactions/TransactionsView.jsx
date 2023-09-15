import React, { useState, useEffect } from 'react'
import { json } from 'react-router-dom';
// import apiKey from '../../apiKey';
import TransactionsTable from './transactionsTable/TransactionsTable.jsx';
import AccountCard from './AccountCard';
import BasicCard from './BasicCard.jsx';
// import TemplateTransactionTable from './transactionsTable/TemplateTransactionTable'
import { getTransactions, getTransaction, getTransactionsByAccount } from '../global/apiRequests/transaction';
import { getAccount, getAccounts } from '../global/apiRequests/account';


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
      <h1>Active Account: {accounts?.find( account => account.id == activeAccountId).name}</h1>
        <br/>
        <AccountCard transactions={transactions} accounts={accounts} setActiveAccountId={setActiveAccountId}/>
        <TransactionsTable transactions={transactions}
         activeAccountId={activeAccountId} 
         accounts={accounts}
         />


    
    </div>
  )
}

export default TransactionsView