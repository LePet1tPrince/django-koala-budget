
import { api_endpoint, apiGetRequest, apiPostRequest } from "./global";

//Transactions //


// get transactions from all accounts and assign to a setState function
export function getTransactions(setTransactions) {
  apiGetRequest(setTransactions, "/transactions/")
}

//get a single transaction, given a setTransaction function and the accounts id.
export function getTransaction(setTransaction, transaction_id) {
  apiGetRequest(setTransaction,`/transactions/${transaction_id}`)
}

//get all transactions from a specific account, given a setTransactions function and the accounts id.
export function getTransactionsByAccount(setTransactions, account_id) {
  apiGetRequest(setTransactions,`/transactions/accounts/${account_id}`)
}


// post a transaction to the transactions page.
export async function postTransaction(data) {
    return apiPostRequest(data, '/transactions/')

}



// export async function postTransactions(data) {
//   try {
//   const response = await fetch(
//     `${api_endpoint}/transactions/createmultiple`,
//     {
//       method: "POST",
//       headers: {
//         'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({...data})
//       });

//   const responseJson = await response.json();
//   console.log(responseJson)
// } catch (error) {
//   console.error(error);
// }
// }

// convert the transactions api json to a format that works with the front end
export function ConvertTransactionsBTF(transactions, activeAccountId) {
  const newTransactions = transactions?.map((row) => {
      
      //if transaction is debiting the account
      if (row.debit.id === activeAccountId) {
          row.category = row.credit.name
          row.inFlow = row.amount
          // row.outFlow = ""

      } else if (row.credit.id === activeAccountId) {
          row.category = row.debit.name
          row.outFlow = row.amount
          // row.inFlow = ""
      } else {
          row.category = "ERROR: account doesn't match"
      }
  
  return (row)
  }
  )

  return newTransactions

};

//old api requests


// export async function getTransactions(setTransactions) {
//     try {

//     const response = await fetch(
//       `${api_endpoint}/transactions/`,
//       {
//         method: "GET",
//         headers: {
//           'Content-Type': 'application/json',
//           }});

//     const contentArray = await response.json();
//     console.log(contentArray)
//     setTransactions(contentArray);
//   } catch (error) {
//     console.error(error);
//   }
// }

// export async function getTransaction(setTransaction, transaction_id) {
//     try {

//     const response = await fetch(
//       `${api_endpoint}/transactions/${transaction_id}`,
//       {
//         method: "GET",
//         headers: {
//           'Content-Type': 'application/json',
//           }});

//     const contentArray = await response.json();
//     console.log(contentArray)
//     setTransaction(contentArray);
//   } catch (error) {
//     console.error(error);
//   }
// }


//get all transactions from a specific account, given a setTransactions function and the accounts id.
// export async function getTransactionsByAccount(setTransactions, account_id) {
//     try {

//     const response = await fetch(
//       `${api_endpoint}/transactions/accounts/${account_id}`,
//       {
//         method: "GET",
//         headers: {
//           'Content-Type': 'application/json',
//           }});

//     const contentArray = await response.json();
//     console.log(contentArray)
//     setTransactions(contentArray);
//   } catch (error) {
//     console.error(error);
//   }
// }