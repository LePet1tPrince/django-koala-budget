import { api_endpoint, apiGetRequest } from "./global";


//get a list of all accounts
export function getAccounts(setAccounts) {
  apiGetRequest(setAccounts,'/accounts/')
}


// get a single account, given the setAccount function and account-ID
export function getAccount(setAccount,account_id) {
  apiGetRequest(setAccount, `/accounts/${account_id}`)
}



// //get a list of all accounts
// export async function getAccounts(setAccounts) {
//     try {

//     const response = await fetch(
//       `${api_endpoint}/accounts/`,
//       {
//         method: "GET",
//         headers: {
//           'Content-Type': 'application/json',
//           }});

//     const contentArray = await response.json();
//     console.log(contentArray)
//     setAccounts(contentArray);
//   } catch (error) {
//     console.error(error);
//   }
// }



// // get a single account, given the setAccount function and account-ID
// export async function getAccount(setAccount,account_id) {
//     try {

//     const response = await fetch(
//       `${api_endpoint}/accounts/${account_id}`,
//       {
//         method: "GET",
//         headers: {
//           'Content-Type': 'application/json',
//           }});

//     const contentArray = await response.json();
//     console.log(contentArray)
//     setAccount(contentArray);
//   } catch (error) {
//     console.error(error);
//   }
// }