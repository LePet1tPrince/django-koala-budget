import React, { useState } from 'react';

import AccountDeleteDialogue from './accountsTable/AccountDeleteDialogue';
import AccountPost from './accountsForm/AccountPost';
import AccountUpdate from './accountsForm/AccountUpdate';
import AccountsPostForm from './archive/AccountsPostForm';
import AccountsPutForm from './archive/AccountsPutForm';
import AccountsTable from './accountsTable/AccountsTable';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import useFetch from '../global/customHooks/useFetch';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const accountTypeValues = [true, 'Asset', 'Liability', 'Income', 'Expense', 'Equity']

function AccountsView() {
    const [ accounts, setAccounts, isAccountsLoading, isAccountsError] = useFetch(`/accounts/`)
  const [ accountSubTypes, setAccountSubTypes, isSubAccountsLoading, isSubAccountsError] = useFetch(`/sub-accounts/`)
  const [value, setValue] = useState(0);
  const [selectedAccountId, setSelectedAccountId] = useState([]);

  const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const filteredAccounts = accounts?.filter(acc => accountTypeValues[value] === true || acc.type === accountTypeValues[value])



    

    
  return (
    <div>
        <h1>Accounts</h1>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="All" {...a11yProps(0)} />
          <Tab label="Asset" {...a11yProps(1)} />
          <Tab label="Liability" {...a11yProps(2)} />
          <Tab label="Income" {...a11yProps(3)} />
          <Tab label="Expense" {...a11yProps(4)} />
          <Tab label="Equity" {...a11yProps(5)} />

        </Tabs>
      </Box>
        {isAccountsLoading? <div>...Loading...</div>:
        isAccountsError? <div>ERROR</div> :
        <>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <AccountPost
            setAccounts={setAccounts} 
            accounts={accounts}
            accountSubTypes={accountSubTypes}
            />
          </Grid>
          <Grid item xs={4}>
            <AccountDeleteDialogue
          selectedAccountId={selectedAccountId}
          setSelectedAccountId={setSelectedAccountId}
          accounts={accounts}
          setAccounts={setAccounts}
           />
          </Grid>
          <Grid item xs={4}>
            <AccountUpdate
          accounts={accounts}
          setAccounts={setAccounts}
          selectedAccountId={selectedAccountId}
          accountSubTypes={accountSubTypes}
           />
          </Grid>

        </Grid>
        <AccountsTable accounts={filteredAccounts} selectedAccountId={selectedAccountId} setSelectedAccountId={setSelectedAccountId}/>
        </>
  }

  {/* <CollapsibleTable/> */}
      
    </div>
  )
}

export default AccountsView