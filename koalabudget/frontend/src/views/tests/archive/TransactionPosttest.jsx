import React, { useState, useEffect } from 'react';
import { api_endpoint } from '../../global/apiRequests/global';

function TransactionPosttest() {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState({
        "debit": 5,
        "credit": 9,
        "date": "2023-10-09",
        "amount": "34.00",
        "notes": "Make sure this works still",
    })
    const url = '/transactions/'

    const options = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({...data})
        };

    function makePost() {
        
        setData(undefined)
        setIsError(false)
        setIsLoading(true)

        const controller = new AbortController()

        fetch(`${api_endpoint}${url}`, { signal: controller.signal, ...options})
        .then(response => response.json())
        .then(setData)
        .catch((e) => {
            if (e.name === "AbortError") return

            setIsError(true)
        })
        .finally(() => {
            if (controller.signal.aborted) return

            setIsLoading(false)
        })

        return () => {
            controller.abort()
        }
    }
  return (
    <div><button onClick={makePost()}>MAke a post!!</button></div>
  )
}

export default TransactionPosttest