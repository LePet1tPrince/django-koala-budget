import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';

function TransactionSearch(props) {
    // const {transactions, setTransactions} = props;
    const { searchText, setSearchText} = props
    // const [searchText, setSearchText] = useState('');
    // const [initialTransactions, setInitialTransactions] = useState();


    // useEffect(() => {
    //     setInitialTransactions(transactions)
    // },[])

    // useEffect(() => {
        

    // },[searchText])

    // function handleChange(e) {
    //     const newSearchText = e.target.value
    //     setSearchText(newSearchText)
    //     // console.log(newSearchText)

    //     if (newSearchText !== '') {
    //         const newTransactions = initialTransactions?.filter(trxn => JSON.stringify(trxn).toLowerCase().includes(newSearchText.toLowerCase()))
    //         setTransactions(newTransactions)
    //     } else {
    //         setTransactions(initialTransactions)
    //     }

    // }

  return (
    <div>
        
        {/* {JSON.stringify(initialTransactions)} */}
        <Box>
            <TextField
            label="search"
            id="transaction-search"
            // sx={{m:1, width: '25%'}}
            InputProps={{
                startAdornment: <InputAdornment position="start"><SearchIcon/></InputAdornment>,
              }}
            //   onChange={(handleChange)}
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
            />
        </Box>

    </div>
    
  )
}

export default TransactionSearch