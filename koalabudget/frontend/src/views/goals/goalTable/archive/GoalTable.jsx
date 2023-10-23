import * as React from 'react';

import { DollarFormat } from '../../../global/apiRequests/global';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function GoalTable({ goals }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Goal Name</TableCell>
            <TableCell align="right">Target</TableCell>
            <TableCell align="right">Saved</TableCell>
            <TableCell align="right">Still to Go</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {goals?.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{DollarFormat.format(row.target)}</TableCell>
              <TableCell align="right">{DollarFormat.format(row.saved)}</TableCell>
              <TableCell align="right">{DollarFormat.format(row.remainder)}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
