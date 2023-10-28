import * as React from 'react';

import { ConvertTransactionsBTF } from '../../global/apiRequests/transaction';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'date', headerName: 'Date', width: 200 },
  { field: 'category', headerName: 'Category', width: 200 },
  { field: 'inFlow', headerName: 'Inflow', width: 200 },
  { field: 'outFlow', headerName: 'outFlow', width: 200 },
  {field: 'notes', headerName: 'Notes',width: 200},
];


export default function TransactionDataTable(props) {
  const { transactions,
     selectedTransactionIds,
      setSelectedTransactionIds,
       activeAccountId,
       alignment
       } = props;

  
  const alignedTransactions = transactions?.filter(row => { return row.is_reconciled === (alignment === "reconciled")

  })
  

  const handleSelectionChange = (selectionModel) => {
    setSelectedTransactionIds(selectionModel);
  };

  

  return (
    <>
    {/* {JSON.stringify(alignedTransactions)} */}
    {/* {JSON.stringify(transactions)} */}

    

  <div style={{ height: '80%', width: '100%' }}>
        <DataGrid
          rows={ConvertTransactionsBTF(alignedTransactions,activeAccountId)}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10,50,100]}
          checkboxSelection
          selectionModel={selectedTransactionIds}
          onRowSelectionModelChange={handleSelectionChange}
        />
    </div>
    
    
    
      </>
    );
    
  
}
