import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import useLocalStorage from '../global/customHooks/useLocalStorage';

//use the following code to test
//const debugSetting = localStorage.getItem('debugSetting')
// if (debutSetting === 'true') {
//   do things
// }
export default function DebugSetting() {
  const [debugSetting, setDebugSetting] = useLocalStorage("debugSetting",false)

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