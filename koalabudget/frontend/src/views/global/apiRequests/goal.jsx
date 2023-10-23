import { apiGetRequest, apiPostRequest, api_endpoint } from "./global";

//get income chart data
export async function getGoals(setGoals) {
  apiGetRequest(setGoals, `/goals/`)
}

export async function postGoal(data) {
  return apiPostRequest(data, '/goals/')

}