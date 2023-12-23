import { apiDeleteRequest, apiGetRequest, apiPostRequest, apiPutRequest, api_endpoint } from "./global";

//Transactions //



// post a transaction to the transactions page.
export async function postTransaction(data) {
    return apiPostRequest(data, '/transactions/')

}

export async function putTransaction(data, updatingId) {
  return apiPutRequest(data, '/transactions/update/', updatingId)

}

export async function BatchUpdateTransactions(data) {
  return apiPutRequest(data, '/transactions/','')

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





