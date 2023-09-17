import React, { useState } from 'react';
import { getTransactions, getTransaction } from '../global/apiRequests/transaction';
import { apiGetRequest } from '../global/apiRequests/global';

function HomeView() {
  const [transaction, setTransaction] = useState()

  return (
    <div>
      <button onClick={() => getTransaction(setTransaction, 5)}>Get Transaction</button>
      {JSON.stringify(transaction)}
    </div>
  )
}

export default HomeView