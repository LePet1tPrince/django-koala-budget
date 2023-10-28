import React, { useState } from 'react';

import AccountCard from './AccountCard';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';

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

  const subtypeValues = ['Bank Account', 'Credit Card', 'Investment Account']

function AccountCardContainer({accounts, activeAccountId, setActiveAccountId}) {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

      const filteredAccounts = accounts.filter(acc => acc.sub_type !== null && acc.sub_type.sub_type === subtypeValues[value])

  return (
    <div>
        <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Bank Accounts" {...a11yProps(0)} />
          <Tab label="Credit Cards" {...a11yProps(1)} />
          <Tab label="Investment Accounts" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
      <AccountCard 
        accounts={filteredAccounts} 
        activeAccountId={activeAccountId}
        setActiveAccountId={setActiveAccountId}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      <AccountCard 
        accounts={filteredAccounts} 
        activeAccountId={activeAccountId}
        setActiveAccountId={setActiveAccountId}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
      <AccountCard 
        accounts={filteredAccounts} 
        activeAccountId={activeAccountId}
        setActiveAccountId={setActiveAccountId}
        />
      </CustomTabPanel>
    </Box>
         
    </div>
  )
}

export default AccountCardContainer