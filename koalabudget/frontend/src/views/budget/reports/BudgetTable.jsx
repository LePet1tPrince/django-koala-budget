// import * as React from 'react';
import react, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import { DollarFormat } from '../../global/apiRequests/global';
import TextField from '@mui/material/TextField';




export default function BudgetTable({ budget }) {
  const [changedData, setChangedData] = useState([...budget])
  // const [totals, setTotals] = useState([])
  let budget_total = 0;
  let actual_total = 0;
  let available_total = 0;
  budget?.map(row => {
    // const temp = totals;
    // setTotals([row.budget + temp[0], row.actual + temp[1], row.available + temp[2]])
    budget_total += parseFloat(row.budget);
    actual_total += parseFloat(row.actual);
    available_total += parseFloat(row.available);
  })

  useEffect(() => {
    setChangedData([...budget])


  },[budget])

  // function handleChange(e, id) {
  //   // setChangedData([...changedData, id: e.target.value])
  //    const newdata = [...changedData]
  //    console.log("newdata", newdata)
  //    const changedRow = newdata.filter(row => row.id === id)[0]
  //    console.log("changedrow", changedRow)

  //    const unchangedRows = newdata.filter(row => row.id !== id)

  //    setChangedData([...unchangedRows, {...changedRow, budget: e.target.value}])
  //    console.log([...unchangedRows, {...changedRow, budget: e.target.value}])


  // }

  const handleChange = (e, row) => {

    const initialValue = e.target.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    console.log('initialValue',initialValue)
      const updatedData = changedData.map((data) => {
        if (data.id === row.id) {
          // Update the 'budget' field of the matching row with the new value
          const currentDecimals = e.target.value.toString().split('.')[1]?.length
          return { ...data, budget: parseFloat(e.target.value).toFixed(Math.min(currentDecimals,2)) };
        }
        return data;
      });
      
      setChangedData(updatedData);
    };

    function handleBlur() {
      console.log("BLURURURU")
    }


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
          {changedData?.sort((a,b) => a.num - b.num).map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.category.name} - {row.category.num}
              </TableCell>
              <TableCell align="right">

                <TextField
                  type="number"
                  margin="none"
                  onChange={(e) => handleChange(e,row)}
                  value={row.budget}
                  onBlur={handleBlur}
                  />
              </TableCell>

              {/* <TableCell align="right">{DollarFormat.format(row.budget)}</TableCell> */}
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
