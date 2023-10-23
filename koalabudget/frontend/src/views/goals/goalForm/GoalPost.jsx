import Button from '@mui/material/Button';
import GoalForm from './GoalForm';
import React from 'react';
import SimpleSnackbar from '../../global/components/SimpleSnackbar';
import { ifDebug } from '../../global/functions/LocalStorageFunctions';
import { postGoal } from '../../global/apiRequests/goal';
import useFormData from '../../global/customHooks/useFormData';
import useSnackbar from '../../global/customHooks/useSnackbar';

function GoalPost({goals, setGoals}) {

  const {snackbarData, setSnackbarData, openSnackbar} = useSnackbar()

    const initialFormData = {
        name: '',
        description: '',
        target: '',
        saved: '',
        remainder:'0'

      }

const [formData, setFormData, open, toggleOpen] = useFormData(initialFormData);


async function handleSubmit() {
    const response = await postGoal(formData);
    if (response.status === 201) {
      openSnackbar("Post Successful",'success')
      
        setFormData(initialFormData)
        const responsejson = await response.json()
        setGoals([...goals, responsejson])
        // setOpen(false);
        toggleOpen();

    } else {
      openSnackbar("Error " + response.status + ' - ' + response.statusText,'error')

    }
    ifDebug(() => {
      console.log("formdata: ", JSON.stringify(formData))
      console.log("response: ", response)

    })


  }

  return (
    <div>
        <Button variant="outlined" onClick={toggleOpen} sx={{margin: "10px"}}>
        + Add new Goal
      </Button>
      <SimpleSnackbar snackbarData={snackbarData} setSnackbarData={setSnackbarData} />
        
        <GoalForm
        formData={formData}
        setFormData={setFormData}
        open={open}
        toggleOpen={toggleOpen}
        handleSubmit={handleSubmit}
        formTitle="Create a New Goal"
        />
    </div>
  )
}

export default GoalPost