import { apiGetRequest, apiPostRequest, apiPutRequest, api_endpoint } from "./global";

//get income chart data
export async function getGoals(setGoals) {
  apiGetRequest(setGoals, `/goals/`)
}

export async function postGoal(data) {
  return apiPostRequest(data, '/goals/')

}

export async function putGoal(data, updatingId) {
  return apiPutRequest(data, '/goals/update/', updatingId)

}