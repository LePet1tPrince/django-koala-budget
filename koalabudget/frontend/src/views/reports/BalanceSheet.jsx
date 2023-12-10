import { DollarFormat } from '../global/apiRequests/global';
import Paper from '@mui/material/Paper';
import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography'

function BalanceSheet(props) {
    const {dateRange, isPITDataLoading, PITData } = props;
    const startDate = dateRange[0].format("YYYY-MM-DD")
    const endDate = dateRange[1].format("YYYY-MM-DD")

    const assetData = PITData?.filter(item => item.type === "Asset")
    const liabilityData = PITData?.filter(item => item.type === "Liability")
    const equityData = PITData?.filter(item => item.type === "Equity" || item.type == "Goal")
    const incomeData = PITData?.filter(item => item.type === "Income")
    const expenseData = PITData?.filter(item => item.type === "Expense")


    
    const assetTotal = assetData?.reduce((accumulator, currentValue) => {
        return accumulator + parseFloat(currentValue.balance);
    }, 0);

    const liabilityTotal = liabilityData?.reduce((accumulator, currentValue) => {
        return accumulator + parseFloat(currentValue.balance);
    }, 0);

    const equityTotal = equityData?.reduce((accumulator, currentValue) => {
        return accumulator + parseFloat(currentValue.balance);
    }, 0);

    const incomeTotal = incomeData?.reduce((accumulator, currentValue) => {
      return accumulator + parseFloat(currentValue.balance);
    }, 0);

  const expenseTotal = expenseData?.reduce((accumulator, currentValue) => {
    return accumulator + parseFloat(currentValue.balance);
    }, 0);


  return (        
        <TableContainer component={Paper}>
            {isPITDataLoading?<div>...Loading...</div>:
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Account</TableCell>
            <TableCell align="right">Asset</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {assetData?.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{DollarFormat.format(row.balance)}</TableCell>
            </TableRow>
          ))}
            <TableRow>
          <TableCell><Typography variant="h5">Total Assets</Typography></TableCell>
            <TableCell align="right"><Typography variant="h5">{DollarFormat.format(assetTotal)}</Typography></TableCell>
          </TableRow>

          <TableRow>
            <TableCell><Typography variant="h5">Account</Typography></TableCell>
            <TableCell align="right"><Typography variant="h5">Liability</Typography></TableCell>
          </TableRow>
          {liabilityData?.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{DollarFormat.format(row.balance)}</TableCell>
            </TableRow>
          ))}
           <TableRow>
          <TableCell><Typography variant="h5">Total Liabilities</Typography></TableCell>
            <TableCell align="right"><Typography variant="h5">{DollarFormat.format(-liabilityTotal)}</Typography></TableCell>
          </TableRow>

           <TableRow>
            <TableCell><Typography variant="h5">Account</Typography></TableCell>
            <TableCell align="right"><Typography variant="h5">Equity</Typography></TableCell>
          </TableRow>
          {equityData?.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{DollarFormat.format(row.balance)}</TableCell>
            </TableRow>
          ))}
           <TableRow>
          <TableCell><Typography>Retained Earnings</Typography></TableCell>
            <TableCell align="right"><Typography>{DollarFormat.format(-incomeTotal - expenseTotal)}</Typography></TableCell>
          </TableRow>
           <TableRow>
          <TableCell><Typography variant="h5">Total Equity</Typography></TableCell>
            <TableCell align="right"><Typography variant="h5">{DollarFormat.format(-equityTotal -incomeTotal - expenseTotal)}</Typography></TableCell>
          </TableRow>

          <TableRow>
          <TableCell><Typography variant="h5">Liabilities and Equity</Typography></TableCell>
            <TableCell align="right"><Typography variant="h5">{DollarFormat.format(-equityTotal - liabilityTotal -incomeTotal - expenseTotal)}</Typography></TableCell>
          </TableRow>

        </TableBody>
      </Table>
    }
    </TableContainer>
  )
}

export default BalanceSheet