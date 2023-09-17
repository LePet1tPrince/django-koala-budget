import React, { useState, useEffect } from 'react'
// import apiKey from '../../apiKey';
import TransactionsTable from './transactionsTable/TransactionsTable.jsx';
import AccountCard from './AccountCard';
// import TemplateTransactionTable from './transactionsTable/TemplateTransactionTable'
import { getTransactions, getTransactionsByAccount, postTransaction } from '../global/apiRequests/transaction';
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

   function createTrxn() {
     


      const newTrxn = {
        "date": "2023-9-17",
        "amount": 12,
        "debit": 3,
        "credit": 7,
        "notes": "Post on Sunday morning"
      }


     
      postTransaction(newTrxn)
      setActiveAccountId(activeAccountId)
    }


    
  return (
    <div>
      <h1>Active Account: {accounts?.find( account => account.id === activeAccountId).name}</h1>
        <br/>
        <AccountCard transactions={transactions} accounts={accounts} setActiveAccountId={setActiveAccountId}/>
        <TransactionsTable transactions={transactions}
         activeAccountId={activeAccountId} 
         />
         <button onClick={() => createTrxn()}>Post Transactions</button>


    
    </div>
  )
}

export default TransactionsView