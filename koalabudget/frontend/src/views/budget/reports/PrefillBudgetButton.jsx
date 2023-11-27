import * as React from 'react';

import Button from '@mui/material/Button';
import { DollarFormat } from '../../global/apiRequests/global';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function PrefillBudgetButton(props) {
    const { lastMonthObject, handleChange, handleBlur, handleValueSet, row } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  function handleLastBudget() {
    // console.log(lastMonthObject[0].budget)
    handleValueSet(lastMonthObject[0].budget, row)
    // budgetRef.current.focus()
    setAnchorEl(null)
  };

  function handleLastActual() {
    // console.log(lastMonthObject[0].actual)
    handleValueSet(lastMonthObject[0].actual, row)
    setAnchorEl(null)
  };

  function handleZero() {
    const total = calculateZero(row)
    handleValueSet(total, row)
    setAnchorEl(null)
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  const calculateZero = (row) => {
    if (row.category.sub_type.account_type === "Income") {
        return parseFloat(row.available)+parseFloat(row.budget)
    } else if (row.category.sub_type.account_type === "Expense") {
        return parseFloat(-row.available)+parseFloat(row.budget)
    }
  };

  return (
    <div>
        {/* {JSON.stringify(row)} */}
        {/* Budget: {row.budget} */}
        {/* <br/> */}
        {/* available: {row.available} */}
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Prefill
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleLastBudget}>Last Month's Budget ({DollarFormat.format(lastMonthObject[0].budget)})</MenuItem>
        <MenuItem onClick={handleLastActual}>Last Month's Actual ({DollarFormat.format(lastMonthObject[0].actual)})</MenuItem>
        <MenuItem onClick={handleZero}>Zero This Month ({DollarFormat.format(calculateZero(row))})</MenuItem>
      </Menu>
    </div>
  );
}