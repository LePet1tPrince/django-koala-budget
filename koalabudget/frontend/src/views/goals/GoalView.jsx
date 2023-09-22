import React, { useState, useEffect} from 'react';
import GoalTable from './GoalTable';
import { getGoals } from '../global/apiRequests/goal';
import { getAccounts } from '../global/apiRequests/account';
import BalanceCard from './BalanceCard';
import Button from '@mui/material/Button';

function GoalView() {
    const [goals, setGoals] = useState();
    const [accounts, setAccounts] = useState();
    const [balances, setBalances] = useState([]);


    useEffect(() => {
        getAccounts(setAccounts)
        getGoals(setGoals);
    },[])

    function calculate_goal_balance(accounts, goals, setBalances) {
        const bal_accounts = accounts.filter(acc => acc.onBalanceSheet)
        let gross_account_bal = 0 
        let goal_bal = 0

        //sum the balance of all balance sheet accounts
        bal_accounts?.map(acc => {
            gross_account_bal += parseFloat(acc.balance)
        });
        
        //sum the amount put towards all goals so far
        goals?.map(goal => {
            goal_bal += parseFloat(goal.saved)
        })

        console.log("balance accounts", JSON.stringify(bal_accounts))
        console.log("balance", goal_bal)
        console.log('gorss_acco8unt_bal', gross_account_bal)
        setBalances([gross_account_bal, goal_bal])

    }

  return (
    <div>
        <BalanceCard balances={balances}/>
        <Button variant="outlined" onClick={() => calculate_goal_balance(accounts, goals, setBalances)}>Refresh</Button>
        <h1>Goals</h1>
        <h2></h2>
        <GoalTable goals={goals}/>
        {JSON.stringify(balances)}
        {/* {JSON.stringify(bal_accounts)} */}
    </div>
  )
}

export default GoalView