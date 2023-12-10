import * as React from 'react';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export const toggleOptions = {
  BUDGET: 'budget',
  ACTUAL: 'actual',
  AVAILABLE: 'available'
}

export default function BarCharttoggle({alignment, setAlignment}) {

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);

    }
  };
//   const handleChange = (event, newAlignment) => {
//     setAlignment(newAlignment);
//   };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
    //   exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value={toggleOptions.BUDGET}>Report</ToggleButton>
      <ToggleButton value={toggleOptions.ACTUAL}>Actual</ToggleButton>
      <ToggleButton value={toggleOptions.AVAILABLE}>Available</ToggleButton>

    </ToggleButtonGroup>
  );
}