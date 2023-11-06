import * as React from 'react';

import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import { DataGrid } from '@mui/x-data-grid';
import { DollarFormat } from '../global/apiRequests/global';
import { interactionSettingsStore } from '@fullcalendar/core/internal';
import { useState } from 'react';

const columns = [
//   { field: 'num', headerName: 'Number', width: 200 },
  { field: 'name', headerName: 'Name', width: 200 },
//   { field: 'type', headerName: 'Account Type', width: 200 },
  {field: 'sub_type', headerName: 'SubType', width: 200,
  valueGetter: (params) => {
    if (!params.value) {
      return ''
    } else {
      return params.value.sub_type

    }
  }
},
//   {field: 'inBankFeed', type: 'boolean', headerName: 'In Bank Feed',width: 200},
  { field: 'balance', headerName:'Account Balance',width: 200, 
  valueGetter: (params) => {
    if (!params.value) {
      return ''
    } else {
      return DollarFormat.format(params.value)

    }
  }},
 

];


export default function AccountsTable({ data, selectedAccountId, setSelectedAccountId }) {
  

//   const handleSelectionChange = (selectionModel) => {
//     setSelectedAccountId(selectionModel);
//   };

  if (!data) {
    return <div>...loading</div>;
  }



  return (
    <Box style={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={[...data].sort((a,b) => a.num - b.num)}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10,50,100]}
        // checkboxSelection
        // selectionModel={selectedAccountId}
        // onRowSelectionModelChange={handleSelectionChange}
      />
    </Box>);
    
  
}
