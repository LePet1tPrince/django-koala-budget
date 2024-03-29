import React, { useState} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import { DollarFormat } from '../../global/apiRequests/global';

export default function AccountsBudgetTable({accounts}) {
  // const [totals, setTotals] = useState([])
  let budget_total = 0;
  let actual_total = 0;
  let available_total = 0;
  accounts?.map(row => {
    // const temp = totals;
    // setTotals([row.budget + temp[0], row.actual + temp[1], row.available + temp[2]])
    budget_total += parseFloat(row.budget);
    actual_total += parseFloat(row.actual);
    available_total += parseFloat(row.available);
  })
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Category</TableCell>
            <TableCell align="right">Budget</TableCell>
            <TableCell align="right">Actual</TableCell>
            <TableCell align="right">Available</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {accounts?.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name} - {row.num}
              </TableCell>
              <TableCell align="right">{DollarFormat.format(row.budget)}</TableCell>
              <TableCell align="right">{DollarFormat.format(row.actual)}</TableCell>
              <TableCell align="right">{DollarFormat.format(row.available)}</TableCell>

            </TableRow>
          ))}
          <TableRow>
          <TableCell><Typography variant="h5">Total</Typography></TableCell>

            <TableCell align="right"><Typography variant="h5">{DollarFormat.format(budget_total)}</Typography></TableCell>
            <TableCell align="right"><Typography variant="h5">{DollarFormat.format(actual_total)}</Typography></TableCell>
            <TableCell align="right"><Typography variant="h5">{DollarFormat.format(available_total)}</Typography></TableCell>


          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
