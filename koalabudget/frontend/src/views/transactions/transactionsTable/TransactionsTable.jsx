// import * as React from 'react';
import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ConvertTransactionsBTF } from '../../global/apiRequests/transaction';
import TableTransactionForm from './TableTransactionForm';





export default function TransactionsTable(props) {
    const { transactions, 
        setTransactions,
        activeAccountId,
        isTransactionForm,
      accounts } = props;

    const transactionForm = 
      // <TableRow>
        <TableTransactionForm 
        accounts={accounts} 
        activeAccountId={activeAccountId} 
         />

      // </TableRow>
    // const sortedTransactions = transactions.sort((a,b) => b.date - a.date)

  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Category</TableCell>
            <TableCell align="right">Inflow</TableCell>
            <TableCell align="right">Outflow</TableCell>
            <TableCell align="right">Notes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* <TableRow> */}
          {isTransactionForm?transactionForm:null}

          {/* </TableRow> */}
          {ConvertTransactionsBTF(transactions, activeAccountId)?.map((row) => {
            return (

            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.date}
              </TableCell>
              <TableCell align="right">{row.category}</TableCell>
              <TableCell align="right">{row.inFlow}</TableCell>
              <TableCell align="right">{row.outFlow}</TableCell>
              <TableCell align="right">{row.notes}</TableCell>
            </TableRow>
          )})}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
