import { useState, useEffect, useCallback } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import TableSortLabel from '@mui/material/TableSortLabel';
import Box from '@mui/material/Box';
import { visuallyHidden } from '@mui/utils';
import MenuBar from './MenuBar';
import TableTransactionForm from './TableTransactionForm';
import Button from '@mui/material/Button';





const DEFAULT_ROWS_PER_PAGE = 5;
const DEFAULT_ORDER = 'asc';
const DEFAULT_ORDER_BY = 'Date';

function handleTransactionDelete(e) {
  console.log(e);
}

function stableSort(array, comparator) {
    const stabilizedThis = array?.map((el, index) => [el, index]);
    stabilizedThis?.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis?.map((el) => el[0]);
  };

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  
 
  

const TransactionsTable = (props) => {
    const { transactions, activeAccount, accounts, postTransaction, getTransactions } = props;
    const [order, setOrder] = useState(DEFAULT_ORDER);
    const [orderBy, setOrderBy] = useState(DEFAULT_ORDER_BY);
    const [visibleRows, setVisibleRows] = useState(null);
    const [dense, setDense] = useState(false);
    const [paddingHeight, setPaddingHeight] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);
    const [page, setPage] = useState(0);
    const [isNewTransaction, setIsNewTransaction] = useState(false); // boolean on whether or not to display the transaction input form

    useEffect(() => {
      let rowsOnMount = stableSort(
        transactions,
        getComparator(DEFAULT_ORDER, DEFAULT_ORDER_BY),
      );
  
      rowsOnMount = rowsOnMount?.slice(
        0 * DEFAULT_ROWS_PER_PAGE,
        0 * DEFAULT_ROWS_PER_PAGE + DEFAULT_ROWS_PER_PAGE,
      );
  
      setVisibleRows(rowsOnMount);
    }, []);
    

      

    const handleRequestSort = useCallback(
        (event, newOrderBy) => {
          const isAsc = orderBy === newOrderBy && order === 'asc';
          const toggledOrder = isAsc ? 'desc' : 'asc';
          setOrder(toggledOrder);
          setOrderBy(newOrderBy);
    
          const sortedRows = stableSort(transactions, getComparator(toggledOrder, newOrderBy));
          const updatedRows = sortedRows.slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage,
          );
    
          setVisibleRows(updatedRows);
        },
        [order, orderBy, page, rowsPerPage],
      );

      const createSortHandler = (newOrderBy) => (event) => {
        handleRequestSort(event, newOrderBy);
      };
    

    const handleChangePage = useCallback(
        (event, newPage) => {
          setPage(newPage);
    
          const sortedRows = stableSort(transactions, getComparator(order, orderBy));
          const updatedRows = sortedRows.slice(
            newPage * rowsPerPage,
            newPage * rowsPerPage + rowsPerPage,
          );
    
          setVisibleRows(updatedRows);
    
          // Avoid a layout jump when reaching the last page with empty rows.
          const numEmptyRows =
            newPage > 0 ? Math.max(0, (1 + newPage) * rowsPerPage - transactions?.length) : 0;
    
          const newPaddingHeight = (dense ? 33 : 53) * numEmptyRows;
          setPaddingHeight(newPaddingHeight);
        },
        [order, orderBy, dense, rowsPerPage],
      );

      const handleChangeRowsPerPage = useCallback(
        (event) => {
          const updatedRowsPerPage = parseInt(event.target.value, 10);
          setRowsPerPage(updatedRowsPerPage);
    
          setPage(0);
    
          const sortedRows = stableSort(transactions, getComparator(order, orderBy));
          const updatedRows = sortedRows.slice(
            0 * updatedRowsPerPage,
            0 * updatedRowsPerPage + updatedRowsPerPage,
          );
    
          setVisibleRows(updatedRows);
    
          // There is no layout jump to handle on the first page.
          setPaddingHeight(0);
        },
        [order, orderBy],
      );

   

    const headers = ["Date", "Category", "Description", "In Flow"]

  return (
    <div>
      {/* <h1>{isNewTransaction.toString()}</h1> */}
      <MenuBar 
      accounts={accounts} 
      postTransaction={postTransaction} 
      getTransactions={getTransactions}/>
      {/* {isNewTransaction ? <TableTransactionForm 
      accounts={accounts} 
      postTransaction={postTransaction} 
      getTransactions={getTransactions} /> : null} */}


    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {headers?.map((text, id) => {
              return <TableCell 
              key={id} 
              align="right" 
              sortDirection={orderBy === id ? order : false}
              >
                <TableSortLabel
                    active={orderBy === id}
                    direction={orderBy === id ? order : 'asc'}
                    onClick={createSortHandler(id)}
                    >{orderBy === id ? (
                    <Box component="span" sx={visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </Box>
                    ) : null}
                </TableSortLabel>
                {text}
                </TableCell>
            })}
          </TableRow>
        </TableHead>
      <TableBody>

        {visibleRows?.map(transaction => {
             const category =
             transaction.attributes.To_account.data.id === activeAccount
               ? transaction.attributes.From_account.data.attributes.Name
               : transaction.attributes.To_account.data.attributes.Name;
               const inFlow =
             transaction.attributes.To_account.data.id === activeAccount
               ? transaction.attributes.Amount
               : -transaction.attributes.Amount;
            //    const outFlow =
            //  transaction.attributes.From_account.data.id === activeAccount
            //    ? transaction.attributes.Amount
            //    : "-";
          return <TableRow key={transaction.id}>
            <TableCell align="right">{transaction.attributes.Date}</TableCell>
            <TableCell align="right">{category}</TableCell>
            <TableCell align="right">{transaction.attributes.Description}</TableCell>

            <TableCell align="right">{inFlow}</TableCell>
            <TableCell align='right'><Button id={transaction.id} color="error" onClick={(e) => handleTransactionDelete(e.target.attributes.id.value)}>Delete</Button></TableCell>
          </TableRow>
})}
      </TableBody>
    </Table>
    </TableContainer>
    <TablePagination
          rowsPerPageOptions={[10, 20, 50, 100, 500]}
          component="div"
          count={transactions?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </div>

  );
};

export default TransactionsTable;
