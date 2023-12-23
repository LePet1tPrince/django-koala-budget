import { apiPostRequest, apiPutRequest, api_endpoint } from "./global";

export async function putBudget(data, updatingId) {
  return apiPutRequest(data, '/budget/update/', updatingId)

}