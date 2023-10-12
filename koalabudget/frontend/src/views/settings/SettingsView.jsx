import React, { useState } from 'react';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import DebugSetting  from './DebugSetting';

// const label = { inputProps: { 'aria-label': 'Debug' } };

function SettingsView() {

  return (
    <div>
       <DebugSetting/>
    </div>
  )
}

export default SettingsView