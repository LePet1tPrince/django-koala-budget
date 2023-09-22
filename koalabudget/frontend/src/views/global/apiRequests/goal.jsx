import { api_endpoint, apiGetRequest } from "./global";


//get income chart data
export async function getGoals(setGoals) {
  apiGetRequest(setGoals, `/goals/`)
}