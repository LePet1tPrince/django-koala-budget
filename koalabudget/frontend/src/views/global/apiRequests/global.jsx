export const api_endpoint = "http://localhost:8000/api";

export async function apiGetRequest(setStateVariable,url='') {
    try {

    const response = await fetch(
      `${api_endpoint}${url}`,
      {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          }});

    const contentArray = await response.json();
    console.log(contentArray)
    setStateVariable(contentArray);
  } catch (error) {
    console.error(error);
  }
}
