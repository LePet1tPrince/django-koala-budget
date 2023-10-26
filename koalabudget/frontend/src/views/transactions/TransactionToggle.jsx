import * as React from 'react';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export const alignmentToggle = {
    RECONCILED: "reconciled",
    CATEGORIZED: "categorized"
}

export default function TransactionToggle({alignment, setAlignment}) {

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="categorized">Categorize</ToggleButton>
      <ToggleButton value="reconciled">Reconciled</ToggleButton>
    </ToggleButtonGroup>
  );
}