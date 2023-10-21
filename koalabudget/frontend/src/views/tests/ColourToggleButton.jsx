import * as React from 'react';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function ColourToggleButton({alignment, setAlignment}) {
  

  const handleChange = (event, newAlignment) => {
    setAlignment({"view": newAlignment});
  };

  return (
    <div>
        {JSON.stringify(alignment)}

    <ToggleButtonGroup
      color="primary"
      value={alignment.view}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
      >
      <ToggleButton value="web" style={{ backgroundColor: alignment.view === 'web' ? 'blue' : 'white' }}>Web</ToggleButton>
      <ToggleButton value="android">Android</ToggleButton>
      <ToggleButton value="ios">iOS</ToggleButton>
    </ToggleButtonGroup>
        </div>
  );
}