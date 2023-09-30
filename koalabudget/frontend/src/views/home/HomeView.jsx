import React, { useState } from 'react';
import { getTransactions, getTransaction } from '../global/apiRequests/transaction';
import { apiGetRequest } from '../global/apiRequests/global';
import SnackbarTest from '../transactions/transactionsTable/SnackbarTest';

function HomeView() {

  return (
    <div>
      Home View
      {/* <SnackbarTest/> */}
    </div>
  )
}

export default HomeView