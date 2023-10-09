
import { api_endpoint, apiGetRequest, apiPostRequest, apiDeleteRequest, apiPutRequest } from "./global";

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

export async function putTransaction(data, updatingId) {
  return apiPutRequest(data, '/transactions/update/', updatingId)

}

export async function deleteTransaction(id) {
  return apiDeleteRequest(`/transactions/delete/${id}`)
}




// convert the transactions api json to a format that works with the front end
export function ConvertTransactionsBTF(transactions, activeAccountId) {
  const newTransactions = transactions?.sort((a,b) => new Date(b.date) - new Date(a.date)).map((row) => {
      
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





