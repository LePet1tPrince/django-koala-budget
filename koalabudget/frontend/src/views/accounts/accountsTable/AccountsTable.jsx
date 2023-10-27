import * as React from 'react';

import Checkbox from '@mui/material/Checkbox';
import { DataGrid } from '@mui/x-data-grid';
import { interactionSettingsStore } from '@fullcalendar/core/internal';
import { useState } from 'react';

const columns = [
  { field: 'num', headerName: 'Number', width: 200 },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'type', headerName: 'Account Type', width: 200 },
  {field: 'inBankFeed', type: 'boolean', headerName: 'In Bank Feed',width: 200},
  { field: 'balance', headerName:'Account Balance',width: 200},
  { field: 'reconciled_balance', headerName:'Reconciled',width: 200},

];


export default function AccountsTable({ accounts, selectedAccountId, setSelectedAccountId }) {
  

  const handleSelectionChange = (selectionModel) => {
    setSelectedAccountId(selectionModel);
  };

  if (!accounts) {
    return <div>...loading</div>;
  }



  return (
    <div style={{ height: '80%', width: '100%' }}>
      <DataGrid
        rows={[...accounts].sort((a,b) => a.num - b.num)}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10,50,100]}
        // checkboxSelection
        selectionModel={selectedAccountId}
        onRowSelectionModelChange={handleSelectionChange}
      />
    </div>);
    
  
}
