import React, { useEffect, useState } from 'react';

import BalanceCard from './BalanceCard';
import Button from '@mui/material/Button';
import GoalPost from './goalForm/GoalPost';
import GoalTable from './goalTable/archive/GoalTable';
import GoalTableContainer from './goalTable/GoalTableContainer';
import UpdateGoalButton from './goalTable/GoalTableContainer';
import { calculateGoalBalances } from './GoalFunctions';
import { getAccounts } from '../global/apiRequests/account';
import { getGoals } from '../global/apiRequests/goal';
import useFetch from '../global/customHooks/useFetch';

function GoalView() {
    const [balances, setBalances] = useState([]);
    // const [ budget, setBudget, isBudgetLoading, isBudgetError] = useFetch(`/budg/et/`)
    const [ accounts, setAccounts, isAccountsLoading, isAccountsError] = useFetch(`/accounts/`)
    const [ goals, setGoals, isGoalsLoading, isGoalsError] = useFetch(`/goals/`)

    
    useEffect(() => {
        calculateGoalBalances(accounts, goals, setBalances);
    },[accounts, goals])
    
   

  return (
    <div>
        <BalanceCard balances={balances}/>
        {/* <Button variant="outlined" onClick={() => calculateGoalBalances(accounts, goals, setBalances)}>Refresh</Button> */}
        <h1>Goals</h1>
        <GoalPost goals={goals} setGoals={setGoals}/>
        <h2></h2>
        <GoalTableContainer goals={goals} setGoals={setGoals}/>
        {/* <GoalTable goals={goals}/> */}
        {/* {JSON.stringify(balances)} */}
        {/* {JSON.stringify(bal_accounts)} */}
        {/* {gross_account_bal} */}
        {/* {balances[0]} */}
    </div>
  )
}

export default GoalView