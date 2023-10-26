import * as React from 'react';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export const alignmentToggle = {
    RECONCILED: "reconciled",
    CATEGORIZED: "categorized"
}

export default function TransactionToggle({alignment, setAlignment}) {

  const handleChange = (event, newAlignment) => {
    if (newAlignment  !== null) {
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
      sx={{margin: "10px"}}
      size='large'
    >
      <ToggleButton value="categorized">Categorize</ToggleButton>
      <ToggleButton value="reconciled">Reconciled</ToggleButton>
    </ToggleButtonGroup>
  );
}