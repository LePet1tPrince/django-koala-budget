import { api_endpoint, apiGetRequest } from "./global";


//get income chart data
export async function getBarData(setBarData, incomeOrExpense,year,month) {
  apiGetRequest(setBarData, `/dashboard/${incomeOrExpense}/${year}/${month}`)
}

// //get income chart data
// export async function getBarData(setBarData, incomeOrExpense,year,month) {
//     try {

//     const response = await fetch(
//       `${api_endpoint}/dashboard/${incomeOrExpense}/${year}/${month}`,
//       {
//         method: "GET",
//         headers: {
//           'Content-Type': 'application/json',
//           }});

//     const contentArray = await response.json();
//     console.log(contentArray)
//     setBarData(contentArray);
//   } catch (error) {
//     console.error(error);
//   }
// }