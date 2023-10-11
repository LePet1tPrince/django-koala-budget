import React, { useState, useEffect } from 'react'
import { api_endpoint } from '../global/apiRequests/global'

function TestFetchThen() {
    const [data, setData] = useState([])


    useEffect(() => {

        const url = "/accounts"


    fetch(`${api_endpoint}${url}`)
            .then(response => response.json())
            .then(responsejson => {
                // console.log("budget2", JSON.stringify([...budget]))
                // console.log("responsejston", JSON.stringify(responsejson))
                // console.log("compone", [...budget, ...responsejson])
                setData([...responsejson])
            })
            .catch((e) => {
                if (e.name === "AbortError") return
    
                // setIsError(true)
            })
            .finally(() => {
                
                // setBudget([...budget, ])
                // if (controller.signal.aborted) return
    
                // setIsLoading(false)
            })
    },[])

    useEffect(() => {
        console.log("Data", data)

    },[data])


  return (
    <div>
        HI
        {JSON.stringify(data)}
    </div>
  )
}

export default TestFetchThen