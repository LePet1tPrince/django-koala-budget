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
    console.log(lastMonthObject[0].budget)
    handleValueSet(lastMonthObject[0].budget, row)
    // budgetRef.current.focus()
    setAnchorEl(null)
  };

  function handleLastActual() {
    console.log(lastMonthObject[0].actual)
    handleValueSet(lastMonthObject[0].actual, row)
    setAnchorEl(null)
  };

  function handleZero() {
    const total = -row.available-row.budget
    handleValueSet(total, row)
    setAnchorEl(null)
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
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
        <MenuItem onClick={handleZero}>Zero This Month ({DollarFormat.format(-row.budget-row.available)})</MenuItem>
      </Menu>
    </div>
  );
}