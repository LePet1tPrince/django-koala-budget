import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { interactionSettingsStore } from '@fullcalendar/core/internal';
import { ConvertTransactionsBTF } from '../../global/apiRequests/transaction';
import useFetch from '../../global/apiRequests/useFetch';



const columns = [
  { field: 'date', headerName: 'Date', width: 200 },
  { field: 'category', headerName: 'Category', width: 200 },
  { field: 'inFlow', headerName: 'Inflow', width: 200 },
  { field: 'outFlow', headerName: 'outFlow', width: 200 },
  {field: 'notes', headerName: 'Notes',width: 200},
];


export default function TransactionDataTable(props) {
  const { transactions,
     selectedTransactions,
      setSelectedTransactions,
       activeAccountId,
       } = props;

 
  

  const handleSelectionChange = (selectionModel) => {
    setSelectedTransactions(selectionModel);
  };

  

  return (
    <>

  <div style={{ height: '80%', width: '100%' }}>
        <DataGrid
          rows={ConvertTransactionsBTF(transactions,activeAccountId)}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10,50,100]}
          checkboxSelection
          selectionModel={selectedTransactions}
          onRowSelectionModelChange={handleSelectionChange}
        />
    </div>
    
    
    
      </>
    );
    
  
}
