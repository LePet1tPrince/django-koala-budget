import { apiDeleteRequest, apiPostRequest, apiPutRequest, api_endpoint } from "./global";

// post a transaction to the transactions page.
export async function postAccount(data) {
  return apiPostRequest(data, '/accounts/')

}

export async function deleteAccount(id) {
  return apiDeleteRequest(`/accounts/delete/${id}`)

  
}

export async function putAccount(data, updatingId) {
  return apiPutRequest(data, '/accounts/update/', updatingId)

}
