import React, { useState, useEffect } from 'react';
import data from './BarChatdata.json';
import BarChart from './BarChart';
import { getTransactions, ConvertTransactionsBTF } from '../global/apiRequests/transaction';

function DashboardView() {
    const [transactions, setTransactions] = useState()

    useEffect(() => {
        getTransactions(setTransactions);

    }, [])

  return (
    <div style={{height:"800px"}}>
        <h1>Hello</h1>
        <div style={{height: "40%", width: "50%"}}>
            {transactions?
            <BarChart data={ConvertTransactionsBTF(transactions)}/>
            :<div>Loading</div>

            }                    


        </div>
    </div>
  )
}

export default DashboardView