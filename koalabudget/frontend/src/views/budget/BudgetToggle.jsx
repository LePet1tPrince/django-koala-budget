import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function BudgetToggle({alignment, setAlignment}) {
  // const [alignment, setAlignment] = React.useState('report');

  const handleChange = (event, newAlignment) => {
    setAlignment({view: newAlignment});
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="report">Report</ToggleButton>
      <ToggleButton value="dashboard">Dashboard</ToggleButton>
      {/* <ToggleButton value="ios">iOS</ToggleButton> */}
    </ToggleButtonGroup>
  );
}