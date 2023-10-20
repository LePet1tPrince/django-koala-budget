import react, { useEffect, useState } from 'react';

import AccountForm from './AccountForm';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import EditIcon from '@mui/icons-material/Edit';
import SimpleSnackbar from '../../global/components/SimpleSnackbar';
import { ifDebug } from '../../global/functions/LocalStorageFunctions';
import { putAccount } from '../../global/apiRequests/account';
import useFormData from '../../global/customHooks/useFormData';
import useSnackbar from '../../global/customHooks/useSnackbar';

const accountTypes = [
    {value:''},
    {value:'Asset'},
    {value:'Liability'},
    {value:'Income'},
    {value: 'Expense'}
]

export default function AccountUpdate({accounts, setAccounts, selectedAccountId}) {
  const {snackbarData, setSnackbarData, openSnackbar} = useSnackbar()

    const initialFormData = {
        name: '',
        num: '',
        type: accountTypes[0].value,
        inBankFeed: false
      }

const [formData, setFormData, open, toggleOpen] = useFormData(initialFormData);



const selectedAccount = accounts?.find(acc => acc.id === selectedAccountId[0]);




useEffect(() => {
    ifDebug(() => console.log("selected Account", JSON.stringify(selectedAccount)))
    
    if (selectedAccountId.length === 1) {

        setFormData({
            "name": selectedAccount.name,
            "num": selectedAccount.num,
            "type": selectedAccount.type,
            "inBankFeed": selectedAccount.inBankFeed
            
        })
    } else {
        setFormData(initialFormData)
    }
  },[selectedAccountId, accounts])

 
 

  async function handleSubmit() {
    const response = await putAccount(formData, selectedAccountId[0]);
    if (response.status === 200) {
      openSnackbar("Update Successful", 'success')
  
        setFormData(initialFormData)
        const responsejson = await response.json()
        const newAccounts = await accounts.map(acc => {
          // console.log("selectedaccountid", selectedAccountId[0])
          if (acc.id === selectedAccountId[0]) {
            
            return ({...responsejson})
          } else { 
            // console.log("account id", acc.id)
            return ({...acc})}
        })
        // console.log("responsejson", JSON.stringify(responsejson))
        // console.log("new Accounts", JSON.stringify(newAccounts))
        setAccounts([...newAccounts])
        // setOpen(false);
        toggleOpen();
        // selectedAccount = responsejson;

        ifDebug(() => console.log("success", responsejson))

    } else {
      openSnackbar("Error " + response.status + ' - ' + response.statusText, 'error')
    

    }
    ifDebug(() => console.log("formdata: ", JSON.stringify(formData)))
    ifDebug(() => console.log("response: ", response))

  }



  return (
    <div>
      <Button 
      variant="outlined" 
      onClick={toggleOpen} 
      sx={{margin: "10px"}}
      disabled={selectedAccountId.length !== 1}>
        <EditIcon/> Edit Account
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
        formTitle="Update Account"
        />
      
    </div>
  );
}
