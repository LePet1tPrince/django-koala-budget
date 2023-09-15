import React, { useState, useEffect } from 'react'
// import apiKey from '../../apiKey';
import TransactionsTable from './transactionsTable/TransactionsTable.jsx';
import AccountCard from './AccountCard';
// import TemplateTransactionTable from './transactionsTable/TemplateTransactionTable'
import { getTransactionsByAccount, postTransaction } from '../global/apiRequests/transaction';
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
        "date": "2023-9-16",
        "amount": 111,
        "debit": 3,
        "credit": 7,
        "notes": "Can I post from the frontend????????????"
      }


     
      postTransaction(newTrxn)
    }


    
  return (
    <div>
      <h1>Active Account: {accounts?.find( account => account.id === activeAccountId).name}</h1>
        <br/>
        <AccountCard transactions={transactions} accounts={accounts} setActiveAccountId={setActiveAccountId}/>
        <TransactionsTable transactions={transactions}
         activeAccountId={activeAccountId} 
         accounts={accounts}
         />
         <button onClick={() => createTrxn()}>Submit Transaction</button>


    
    </div>
  )
}

export default TransactionsView