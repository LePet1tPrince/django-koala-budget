import React, { useState, useEffect } from 'react'
import { json } from 'react-router-dom';
// import apiKey from '../../apiKey';
import TransactionsTable from './transactionsTable/TransactionsTable.jsx';
import AccountCard from './AccountCard';
import BasicCard from './BasicCard.jsx';
import { getTransactions, getTransactionsByAccount, getAccounts, getAccount } from './APIRequests.jsx';

function TransactionsView() {
    const [transactions, setTransactions] = useState();
    const [accounts, setAccounts] = useState();
    const [activeAccount, setActiveAccount] = useState();

    useEffect(() => {
        getTransactions(setTransactions);
        getAccounts(setAccounts);

    },[])


    

    

    
    
  return (
    <div>
      <h1>Active Account: {activeAccount}</h1>
        <br/>
        <p>{JSON.stringify(transactions)}</p>
        <AccountCard transactions={transactions} accounts={accounts} setActiveAccount={setActiveAccount}/>
        <button onClick={() => getTransactionsByAccount(setTransactions, 3)}>Button!! 3</button>
        <button onClick={() => getTransactionsByAccount(setTransactions, 4)}>Button!! 4</button>
        <p>{JSON.stringify(accounts)}</p>
        <button onClick={() => getAccount(setAccounts, 4)}>Button!! 4</button>


    
    </div>
  )
}

export default TransactionsView