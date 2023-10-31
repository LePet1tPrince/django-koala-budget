import * as React from 'react';

import Box from '@mui/material/Box';
import { ConvertTransactionsBTF } from '../../global/apiRequests/transaction';
import { DataGrid } from '@mui/x-data-grid';
import { DollarFormat } from '../../global/apiRequests/global';

const columns = [
  { field: 'date', headerName: 'Date', width: 200 },
  { field: 'category', headerName: 'Category', width: 200 },
  { field: 'inFlow', headerName: 'Inflow', width: 200,
    valueGetter: (params) => {
      if (!params.value) {
        return ''
      } else {
        return DollarFormat.format(params.value)

      }
    } },
  { field: 'outFlow', headerName: 'outFlow', width: 200,
  valueGetter: (params) => {
    if (!params.value) {
      return ''
    } else {
      return DollarFormat.format(params.value)

    }
  }},
  {field: 'notes', headerName: 'Notes',width: 500},
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

    

  <Box 
  sx={{ height: 520, width: '100%' }}
  >
        <DataGrid
          rows={ConvertTransactionsBTF(alignedTransactions,activeAccountId)}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 25 },
            },
          }}
          pageSizeOptions={[10,25,50,100]}
          checkboxSelection
          selectionModel={selectedTransactionIds}
          onRowSelectionModelChange={handleSelectionChange}
        />
    </Box>
    
    
    
      </>
    );
    
  
}
