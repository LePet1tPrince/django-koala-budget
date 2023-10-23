import React, { useState } from 'react';

import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import GoalTable from './archive/GoalTable';
import UpdateGoalTable from './UpdateGoalTable';

function GoalTableContainer({goals, setGoals}) {
  //state for either 'edit' or 'view' mode
  const [mode, setMode] = useState('view')

  function toggleMode(){
    if (mode === "view") {
      setMode("edit");

    } else {
      setMode('view')
    }
  }

  return (
    <div>
        <Button variant='contained' onClick={toggleMode}><EditIcon/></Button>
        {goals? 
        <UpdateGoalTable goals={goals} setGoals={setGoals} mode={mode}/>
        :null}

        
    </div>
  )
}

export default GoalTableContainer