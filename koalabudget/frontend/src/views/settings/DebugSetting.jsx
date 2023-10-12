import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import useLocalStorage from '../global/customHooks/useLocalStorage';


export default function DebugSetting() {
  const [debugSetting, setDebugSetting] = useLocalStorage("debugSetting",false)

  const label = { inputProps: { 'aria-label': 'Debug' } };
    function handleChange() {
        setDebugSetting(!debugSetting)
    }

 return (
    <div>
        <FormGroup>
            <FormControlLabel 
            control={<Switch checked={debugSetting} onChange={handleChange}/>}
            label="debug"/>
        </FormGroup>
    </div>
  )
}