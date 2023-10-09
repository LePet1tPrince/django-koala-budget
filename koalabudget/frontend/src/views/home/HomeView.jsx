import React, { useState } from 'react';
import { getTransactions, getTransaction } from '../global/apiRequests/transaction';
import { apiGetRequest } from '../global/apiRequests/global';
import SnackbarTest from '../transactions/transactionsTable/SnackbarTest';
import TransactionPosttest from './TransactionPosttest';
import MultipleTransactionPost from './MultipleTransactionsPost';

function HomeView() {

  return (
    <div>
      Home View
      {/* <SnackbarTest/> */}
      {/* <TransactionPosttest/> */}
      <MultipleTransactionPost/>
    </div>
  )
}

export default HomeView