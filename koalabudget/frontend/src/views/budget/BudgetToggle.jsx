import * as React from 'react';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export const budgetViewToggle = {
  REPORT: 'report',
  DASHBOARD: 'dashboard'
}

export default function BudgetToggle({alignment, setAlignment}) {

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);

    }
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value={budgetViewToggle.REPORT}>Report</ToggleButton>
      <ToggleButton value={budgetViewToggle.DASHBOARD}>Dashboard</ToggleButton>
    </ToggleButtonGroup>
  );
}