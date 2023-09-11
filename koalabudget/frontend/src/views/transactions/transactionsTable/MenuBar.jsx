import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TableTransactionForm from './TableTransactionForm';

function MenuBar(props) {

  const { accounts,
  postTransaction,
  getTransactions } = props;

    // function handleClick() {
    //     setIsNewTransaction(true);
    // }
  return (
    <Box>
        {/* <Button onClick={() => props.setIsNewTransaction(!props.isNewTransaction)}>{props.isNewTransaction ?  <ExpandMoreIcon/>: <ExpandLessIcon/>}</Button> */}
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h5">+ New Transaction</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableTransactionForm 
          accounts={accounts} 
      postTransaction={postTransaction} 
      getTransactions={getTransactions} />
        </AccordionDetails>
      </Accordion>
     
    
    </Box>
  )
}

export default MenuBar