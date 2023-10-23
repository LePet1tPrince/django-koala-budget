import * as React from 'react';

import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import SimpleSnackbar from '../../global/components/SimpleSnackbar';
import TextField from '@mui/material/TextField';
import { ifDebug } from '../../global/functions/LocalStorageFunctions';
import useSnackbar from '../../global/customHooks/useSnackbar';

export default function GoalForm(props) {
    const {formData, setFormData, open, toggleOpen, handleSubmit, formTitle} = props;

  
  function handleChange(event, field) {
    const updatedFormData = { ...formData };
        updatedFormData[field] = event.target.value;
        setFormData(updatedFormData);


    ifDebug(() => console.log(updatedFormData))

  }

  



  return (
    <div>
      

      <Dialog open={open} onClose={toggleOpen}>
        <DialogTitle>{formTitle}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={4}>
                <TextField
                autoFocus
                id="name"
                label="Goal Name"
                type="text"
                variant="outlined"
                margin="normal"
                onChange={e => handleChange(e,"name")}
                value={formData.name}
                />
            </Grid>
            <Grid item xs={4}>
                <TextField
                autoFocus
                id="target"
                label="Target"
                type="number"
                variant="outlined"
                margin="normal"
                InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                onChange={e => handleChange(e,"target")}
                value={formData.target}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                autoFocus
                id="description"
                label="Description"
                type="text"
                variant="outlined"
                margin="normal"
                multiline
                minRows={2}
                fullWidth
                onChange={e => handleChange(e,"description")}
                value={formData.description}
                />
            </Grid>
            

            {/* <Grid item xs={4}>
                <TextField
                autoFocus
                id="saved"
                label="Saved"
                type="number"
                variant="outlined"
                margin="normal"
                InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                onChange={e => handleChange(e,"saved")}
                value={formData.saved}
                />
            </Grid> */}
            
          
            
        </Grid>
        
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleOpen} variant="outlined">Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
