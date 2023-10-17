import { useEffect, useState } from 'react';

import { api_endpoint } from '../apiRequests/global';

function useFetch(url, options = {}) {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState()
    

    useEffect(() =>{
        
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
    },[url])

  
  return [ data, setData, isLoading, isError ]
}

export default useFetch