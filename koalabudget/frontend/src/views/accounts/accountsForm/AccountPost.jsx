import AccountForm from './AccountForm';
import Button from '@mui/material/Button';
import React from 'react';
import SimpleSnackbar from '../../global/components/SimpleSnackbar';
import { ifDebug } from '../../global/functions/LocalStorageFunctions';
import { postAccount } from '../../global/apiRequests/account';
import useFetch from '../../global/customHooks/useFetch';
import useFormData from '../../global/customHooks/useFormData';
import useSnackbar from '../../global/customHooks/useSnackbar';

export const accountTypes = [
    {value:''},
    {value:'Asset'},
    {value:'Liability'},
    {value:'Income'},
    {value: 'Expense'},
    {value: 'Equity'}
]

function AccountPost({setAccounts, accounts}) {

  const {snackbarData, setSnackbarData, openSnackbar} = useSnackbar()

    const initialFormData = {
        name: '',
        num: '',
        type: accountTypes[0].value,
        sub_type: '',
        inBankFeed: false
      }

const [formData, setFormData, open, toggleOpen] = useFormData(initialFormData);
const [ accountSubTypes, setAccountSubTypes, isSubAccountsLoading, isSubAccountsError] = useFetch(`/sub-accounts/`)



async function handleSubmit() {
    const response = await postAccount(formData);
    if (response.status === 201) {
      openSnackbar("Post Successful",'success')
      
        // setFormData(initialFormData)
        const responsejson = await response.json()
        const newAccountSubType = accountSubTypes.find(t => t.id === responsejson.sub_type).sub_type
        setAccounts([...accounts, {...responsejson, "sub_type_name": newAccountSubType}])
        // setOpen(false);
        // toggleOpen();

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
        + Add new Account
      </Button>
      <SimpleSnackbar snackbarData={snackbarData} setSnackbarData={setSnackbarData} />
        
        <AccountForm
        accounts={accounts}
        setAccounts={setAccounts}
        formData={formData}
        setFormData={setFormData}
        open={open}
        toggleOpen={toggleOpen}
        accountTypes={accountTypes}
        handleSubmit={handleSubmit}
        formTitle="Create a New Account"
        accountSubTypes={accountSubTypes}
        />
    </div>
  )
}

export default AccountPost