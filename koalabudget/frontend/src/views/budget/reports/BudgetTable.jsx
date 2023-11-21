import { calculateTotals, sortBudget } from '../../global/functions/BudgetFunctions';
import { useEffect, useState } from 'react';

import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Collapse from '@mui/material/Collapse';
import { DollarFormat } from '../../global/apiRequests/global';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Paper from '@mui/material/Paper';
import SimpleSnackbar from '../../global/components/SimpleSnackbar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import TransactionUpdate from './TransactionUpdate';
import { Typography } from '@mui/material';
import dayjs from 'dayjs';
import { putBudget } from '../../global/apiRequests/budget';
import useFetch from '../../global/customHooks/useFetch';
import useSnackbar from '../../global/customHooks/useSnackbar';

function Row(props) {
  const { row, handleChange, handleBlur, transactions, setTransactions, isTransactionsLoading, accounts } = props;
  const [open, setOpen] = useState(false)
  const [selectedTransactionIds, setSelectedTransactionIds] = useState([])
  
  const filteredTransactions = transactions?.filter(trxn => (trxn.debit.id === row.category.id || trxn.credit.id === row.category.id)&& dayjs(row.month, "YYYY-MM-DD").format("YYYY-MM") === dayjs(trxn.date,"YYYY-MM-DD").format("YYYY-MM"))
  // const selectedTransactionIds = filteredTransactions?.map(trxn => trxn.id)

  

  return (
    <>
    <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, "padding": "0" }}
            >
              <TableCell>
              <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            disabled={filteredTransactions?.length === 0}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
              </TableCell>
              <TableCell component="th" scope="row">
                {row.category.name}
              </TableCell>
              <TableCell align="right"
              sx={{"margin": "0px", "padding": "0"}}>

                <TextField
                  type="number"
                  onChange={(e) => handleChange(e,row)}
                  value={row.budget}
                  onBlur={() => handleBlur(row)}
                  size="small"
                  
                  />
              </TableCell>

              <TableCell align="right">
              <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            disabled={filteredTransactions?.length === 0}
          >
            {/* {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />} */}
                {DollarFormat.format(row.actual)}
          </IconButton>
                </TableCell>
              <TableCell align="right">
              <Chip label={DollarFormat.format(row.available)} color={row.available>=0?'success':'error'} />
              </TableCell>

            </TableRow>
            <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <h2>Transactions</h2>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Account</TableCell>
                  <TableCell>Notes</TableCell>
                </TableRow>
              </TableHead>
            {isTransactionsLoading? 
            <TableRow>
              <TableCell >
              <CircularProgress />

              </TableCell>
            </TableRow>:
              <TableBody>
                {filteredTransactions?.map(trxn => {
                  return (
                    <TableRow key={trxn.id}>
                      <TableCell>
                        <TransactionUpdate
                          accounts={accounts}
                          activeAccountId={trxn.debit.id === row.category.id? trxn.credit.id:trxn.debit.id}
                          setTransactions={setTransactions}
                          selectedTransactionIds={selectedTransactionIds}
                          setSelectedTransactionIds={setSelectedTransactionIds}
                          transactions={transactions}
                          transactionId={trxn.id}
                      /></TableCell>
                      <TableCell>{trxn.date}</TableCell>
                      <TableCell>${trxn.debit.id === row.category.id?-trxn.amount:trxn.amount}</TableCell>
                      <TableCell>{trxn.debit.id === row.category.id? trxn.credit.name:trxn.debit.name}</TableCell>
                      <TableCell>{trxn.notes}</TableCell>

                    </TableRow>
                  )
                })}
              </TableBody>
              }
            </Table>
            </Collapse>

          </TableCell>
            </TableRow>
            </>
  )
}

export default function BudgetTable(props) {
  const { budget, budgetThisMonth, tableType } = props;
  let initialBudget
  if ( tableType === "income") {
    initialBudget = budgetThisMonth?.filter(entry => entry.category.type === "Income")
        
  } else if ( tableType === "expense" ) {
    initialBudget = budgetThisMonth?.filter(entry => entry.category.type === "Expense")
    
  } else if ( tableType === "goal") {
    initialBudget = budgetThisMonth?.filter(entry => entry.category.type === "Goal")

  }
  const [changedData, setChangedData] = useState([...initialBudget]);
  const {snackbarData, setSnackbarData, openSnackbar} = useSnackbar();
  const debugSetting = localStorage.getItem('debugSetting');
  const [columnTotals, setColumnTotals] = useState({budget: 0, actual: 0, available: 0});
  const [ transactions, setTransactions, isTransactionsLoading, isTransactionsError] = useFetch(`/transactions`)
  const [ accounts, setAccounts, isAccountsLoading, isAccountsError] = useFetch(`/accounts`)





  useEffect(() =>{
    setChangedData([...initialBudget]) // setting up the input state
    calculateTotals(initialBudget, setColumnTotals) //set column totals using initial budget

    
  },[budgetThisMonth])




  const handleChange = (e, row) => {
    const newValue = e.target.value.trim() === '' ? '0.00' : e.target.value.toString(); // Handle blank value as 0

      const updatedData = changedData.map((data) => {
        if (data.id === row.id) {
          // Update the 'budget' field of the matching row with the new value
          const currentDecimals = e.target.value.toString().split('.')[1]?.length
          return { ...data, budget: parseFloat(newValue).toFixed(Math.min(currentDecimals,2)) }; //maximum allowed 2 decimals. less is okay
          // return { ...data, budget: e.target.value }; //maximum allowed 2 decimals. less is okay
        
        }
        return data;
      });
      if (debugSetting === 'true') {
      console.log('updated data', updatedData)
      }
      setChangedData(updatedData);
    };


// run the blur function
    async function handleBlur(row) {
      //find the budget that has been changed
      const matchingBudget = budget.find(bud => bud.id === row.id)

      if (matchingBudget && row.budget !== matchingBudget.budget) {
        const changedBudget = {
          ...row,
          category: row.category.id,
          budget: matchingBudget.category.type === "Income"? -parseFloat(row.budget).toFixed(2): parseFloat(row.budget).toFixed(2)
        };
        try {
          const response = await putBudget(changedBudget, changedBudget.id);
      if (response.status === 200) {
        const responsejson = await response.json()
        //only display if debut set to true.
        if (debugSetting === 'true') {
          console.log('success')
          console.log("Budget",budget)
          console.log("ChangedBudget",changedBudget)
          console.log("response", responsejson)
          openSnackbar("Update Successful", 'success')

        }

       
              const categoryObject = budget.find(b => (b.id === changedBudget.id)).category
              const updatedChangedData = changedData.map((b) => (b.id === changedBudget.id ? 
                  categoryObject.type === "Income"?

                  {...responsejson,
                    category: categoryObject, 
                    budget: -responsejson.budget, 
                    actual: -responsejson.actual, 
                    available: responsejson.available} 
  
                    : 
                    {...responsejson,
                      category: categoryObject, 
                      available: responsejson.available
                    } : b));
              setChangedData(updatedChangedData)
              calculateTotals(updatedChangedData, setColumnTotals)


              
      
  
      } else {
        openSnackbar("Error " + response.status + ' - ' + response.statusText, 'error')
  
      }

        } catch (error) {
          console.error(error);
          openSnackbar('An error occurred while updating the budget.', 'error');
        }

                    
       }
    
    }


  return (
    <TableContainer component={Paper}>

      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell></TableCell>
            <TableCell>Category</TableCell>
            <TableCell align="right">Budget</TableCell>
            <TableCell align="right">Actual</TableCell>
            <TableCell align="right">Available</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {sortBudget(changedData)?.map((row) => (
            <Row key={row.name}
             row={row} 
             handleChange={handleChange} 
             handleBlur={handleBlur} 
             transactions={transactions}
             setTransactions={setTransactions}
             isTransactionsLoading={isTransactionsLoading}
             accounts={accounts}
             />
            
            
          ))}
          <TableRow>
          <TableCell><Typography variant="h5">Total</Typography></TableCell>

            {/* <TableCell align="right"><Typography variant="h5">{DollarFormat.format(budget_total)}</Typography></TableCell>
            <TableCell align="right"><Typography variant="h5">{DollarFormat.format(actual_total)}</Typography></TableCell>
            <TableCell align="right"><Typography variant="h5">{DollarFormat.format(available_total)}</Typography></TableCell> */}
            <TableCell align="right"><Typography variant="h5">{DollarFormat.format(columnTotals.budget)}</Typography></TableCell>
            <TableCell align="right"><Typography variant="h5">{DollarFormat.format(columnTotals.actual)}</Typography></TableCell>
            <TableCell align="right"><Typography variant="h5">{DollarFormat.format(columnTotals.available)}</Typography></TableCell>

          </TableRow>
        </TableBody>
      </Table>
      <SimpleSnackbar snackbarData={snackbarData} setSnackbarData={setSnackbarData} />
    </TableContainer>
  );
}
