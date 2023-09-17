import { api_endpoint, apiGetRequest } from "./global";


//get a list of all budgets
export async function getBudgets(setBudgets) {
  apiGetRequest(setBudgets,'/budget')
}

//get a list of all budgets in a specific month
export async function getBudgetByMonth(setBudgets, year, month) {
  apiGetRequest(setBudgets,`/budget/month/${year}/${month}`)
}

//get a list of all budgets
// export async function getBudgets(setBudgets) {
//     try {

//     const response = await fetch(
//       `${api_endpoint}/budget/`,
//       {
//         method: "GET",
//         headers: {
//           'Content-Type': 'application/json',
//           }});

//     const contentArray = await response.json();
//     console.log(contentArray)
//     setBudgets(contentArray);
//   } catch (error) {
//     console.error(error);
//   }
// }



//get a list of all budgets in a specific month
// export async function getBudgetByMonth(setBudgets, year, month) {
//     try {

//     const response = await fetch(
//       `${api_endpoint}/budget/month/${year}/${month}`,
//       {
//         method: "GET",
//         headers: {
//           'Content-Type': 'application/json',
//           }});

//     const contentArray = await response.json();
//     console.log(contentArray)
//     setBudgets(contentArray);
//   } catch (error) {
//     console.error(error);
//   }
// }