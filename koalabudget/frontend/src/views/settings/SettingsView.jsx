import React, { useState } from 'react';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const label = { inputProps: { 'aria-label': 'Debug' } };

function SettingsView() {
    const [debugToggle, setDebugToggle] = useState(false)
    // const [options, setOptions] = useLocalStorage('options', [
    //     { debug: false}
    // ])

    const label = { inputProps: { 'aria-label': 'Debug' } };
    function handleChange() {
        setDebugToggle(!debugToggle)
    }

  return (
    <div>
        <FormGroup>
            <FormControlLabel 
            control={<Switch checked={debugToggle} onChange={handleChange}/>}
            label="debug"/>
        </FormGroup>
        {JSON.stringify(debugToggle)}
    </div>
  )
}

export default SettingsView