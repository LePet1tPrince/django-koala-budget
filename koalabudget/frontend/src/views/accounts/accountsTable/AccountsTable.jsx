import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'num', headerName: 'Number', width: 200 },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'type', headerName: 'Account Type', width: 200 },
  {field: 'onBalanceSheet', headerName: 'Balance Sheet Account',width: 200},
  { field: 'balance', headerName:'Account Balance',width: 200}
];


export default function AccountsTable({ accounts }) {
    if (accounts) {


  return (
    <div style={{ height: '80%', width: '100%' }}>
      <DataGrid
        rows={accounts.sort((a,b) => a.num - b.num)}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10,50,100]}
        checkboxSelection
      />
    </div>);}
    else {
        return (<div>...loading</div>)
    }
    
  
}
