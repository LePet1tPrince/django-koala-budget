import React, { useEffect, useState } from 'react';

import BalanceCard from './BalanceCard';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import GoalPost from './goalForm/GoalPost';
import GoalTable from './goalTable/archive/GoalTable';
import GoalTableContainer from './goalTable/archive/GoalTableContainer';
import { Grid } from '@mui/material';
import UpdateGoalButton from './goalTable/archive/GoalTableContainer';
import UpdateGoalTable from './goalTable/UpdateGoalTable';
import { calculateGoalBalances } from './GoalFunctions';
import { getAccounts } from '../global/apiRequests/account';
import { getGoals } from '../global/apiRequests/goal';
import useFetch from '../global/customHooks/useFetch';

function GoalView() {
    const [balances, setBalances] = useState([]);
    // const [ budget, setBudget, isBudgetLoading, isBudgetError] = useFetch(`/budg/et/`)
    const [ accounts, setAccounts, isAccountsLoading, isAccountsError] = useFetch(`/accounts/`)
    const [ goals, setGoals, isGoalsLoading, isGoalsError] = useFetch(`/goals/`)
    const [mode, setMode] = useState('view')

    function toggleMode(){
      if (mode === "view") {
        setMode("edit");
  
      } else {
        setMode('view')
      }
    }
    
    useEffect(() => {
        calculateGoalBalances(accounts, goals, setBalances);
    },[accounts, goals])
    
   

  return (
    <div>
        <BalanceCard balances={balances}/>
        {/* <Button variant="outlined" onClick={() => calculateGoalBalances(accounts, goals, setBalances)}>Refresh</Button> */}
        <h1>Goals</h1>
        <Grid container>
            <Grid item xs={6}>
        <GoalPost goals={goals} setGoals={setGoals}/>

            </Grid>
            <Grid 
            item 
            xs={6} 
            >

        <Button variant='contained' onClick={toggleMode}><EditIcon/></Button>
            </Grid>

        </Grid>

        {isGoalsLoading? <div>...Loading</div> :
        <UpdateGoalTable goals={goals} setGoals={setGoals} mode={mode}/>
        // <GoalTableContainer goals={goals} setGoals={setGoals} />
        }
        {/* <GoalTable goals={goals}/> */}
        {/* {JSON.stringify(balances)} */}
        {/* {JSON.stringify(bal_accounts)} */}
        {/* {gross_account_bal} */}
        {/* {balances[0]} */}
    </div>
  )
}

export default GoalView