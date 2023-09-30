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
export async function apiDeleteRequest(url='') {
  try {
    const response = await fetch(
      `${api_endpoint}${url}`, 
      {
        method: 'DELETE',
        headers: {
          'Content-Type' : 'application/json',
        }
      }
    )
    return response

  } catch (error) {
    return error
  }}
    


// export async function apiDeleteRequest(url='') {
//   fetch(`${api_endpoint}${url}`, {
//       method: 'DELETE',
//       headers: {
//           'Content-Type' : 'application/json',
//       }
//   }).then((response) => {
//       if (response.ok) {
//           console.log('Transaction deleted')
//           console.log('response', response.status)
//           return response
//       } else {
//           console.log('Error deleteing transaction')
//           return response
//       }
//   })

// }


//example put request
// let updateTrxns = async (trxn) => {
//   fetch(`${apiEndPoint}/api/trxns/${trxn.id}/update`, {
//       method: "PUT",
//       headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json',
//           // 'X-CSRFToken': csrftoken
//       },
//       body: JSON.stringify(trxn)
//   }).then ((response) => {
//       if (response.ok) {
//           getTrxns();
//           alert('Transaction successfully updated')

//       }
//       else {
//           alert('there was an error saving the transaction')
//           alert(JSON.stringify(trxn))
//       }
//   })
// }
export let DollarFormat = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

