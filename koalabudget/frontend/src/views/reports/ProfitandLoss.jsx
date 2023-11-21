import { DollarFormat } from '../global/apiRequests/global';
import Paper from '@mui/material/Paper';
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

function ProfitandLoss(props) {
    const {dateRange, isRangeDataLoading, incomeData, expenseData } = props;
    const startDate = dateRange[0].format("YYYY-MM-DD")
    const endDate = dateRange[1].format("YYYY-MM-DD")
    // const [ data, setData, isDataLoading, isDataError] = useFetch(`/reports/${startDate}/${endDate}`)

    const incomeTotal = incomeData?.reduce((accumulator, currentValue) => {
        return accumulator + parseFloat(currentValue.balance);
    }, 0);

    const expenseTotal = expenseData?.reduce((accumulator, currentValue) => {
        return accumulator + parseFloat(currentValue.balance);
    }, 0);


  return (        
        <TableContainer component={Paper}>
            {isRangeDataLoading?<div>...Loading...</div>:
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Account</TableCell>
            <TableCell align="right">Income</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {incomeData?.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{DollarFormat.format(-row.balance)}</TableCell>
            </TableRow>
          ))}
          <TableRow>
          <TableCell><Typography variant="h5">Total Income</Typography></TableCell>
            <TableCell align="right"><Typography variant="h5">{DollarFormat.format(-incomeTotal)}</Typography></TableCell>
          </TableRow>

          {/* Expenses */}
          <TableRow>
            <TableCell><Typography variant="h5">Account</Typography></TableCell>
            <TableCell align="right"><Typography variant="h5">Expense</Typography></TableCell>
          </TableRow>
          {expenseData?.map((row) => (
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
          <TableCell><Typography variant="h5">Total Expenses</Typography></TableCell>
            <TableCell align="right"><Typography variant="h5">{DollarFormat.format(expenseTotal)}</Typography></TableCell>
          </TableRow>

          <TableRow>
          <TableCell><Typography variant="h5">Net Profit</Typography></TableCell>
            <TableCell align="right"><Typography variant="h5">{DollarFormat.format(-incomeTotal - expenseTotal)}</Typography></TableCell>
          </TableRow>
          

        </TableBody>
      </Table>
    }
    </TableContainer>
  )
}

export default ProfitandLoss