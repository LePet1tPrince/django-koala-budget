export const api_endpoint = "http://localhost:8000/api";


//generic get request
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

// generic post request
export async function apiPostRequest(data, url='') {
  try {
    const response = await fetch(
      `${api_endpoint}${url}`,
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({...data})
        });
    return response
  } catch (error) {
    return error
  }
}

export let DollarFormat = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});