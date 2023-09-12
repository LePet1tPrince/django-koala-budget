
import { api_endpoint } from "./global";

//Transactions //


// get transactions from all accounts and assign to a setState function
export async function getTransactions(setTransactions) {
    try {

    const response = await fetch(
      `${api_endpoint}/transactions/`,
      {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          }});

    const contentArray = await response.json();
    console.log(contentArray)
    setTransactions(contentArray);
  } catch (error) {
    console.error(error);
  }
}

//get a single transaction, given a setTransaction function and the accounts id.
export async function getTransaction(setTransaction, transaction_id) {
    try {

    const response = await fetch(
      `${api_endpoint}/transactions/${transaction_id}`,
      {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          }});

    const contentArray = await response.json();
    console.log(contentArray)
    setTransaction(contentArray);
  } catch (error) {
    console.error(error);
  }
}

//get all transactions from a specific account, given a setTransactions function and the accounts id.
export async function getTransactionsByAccount(setTransactions, account_id) {
    try {

    const response = await fetch(
      `${api_endpoint}/transactions/accounts/${account_id}`,
      {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          }});

    const contentArray = await response.json();
    console.log(contentArray)
    setTransactions(contentArray);
  } catch (error) {
    console.error(error);
  }
}

// post a new transaction
export async function postTransaction(data) {
    try {
    const response = await fetch(
      `${api_endpoint}/transactions/`,
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({data: {...data}})
        });

    const responseJson = await response.json();
    console.log(responseJson)
  } catch (error) {
    console.error(error);
  }
}

