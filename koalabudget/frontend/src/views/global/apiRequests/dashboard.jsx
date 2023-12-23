import { apiGetRequest, api_endpoint } from "./global";

//get income chart data
export async function getBarData(setBarData, incomeOrExpense,year,month) {
  apiGetRequest(setBarData, `/dashboard/${incomeOrExpense}/${year}/${month}`)
}
