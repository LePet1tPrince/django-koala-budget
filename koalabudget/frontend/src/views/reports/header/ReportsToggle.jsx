import * as React from 'react';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function ReportsToggle(props) {
    const { reportTypes, alignment, setAlignment} = props;
  

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
        {reportTypes.map(item => {
            return (<ToggleButton key={item.name} value={item.name}>{item.name}</ToggleButton>)
        })}
  
    </ToggleButtonGroup>
  );
}