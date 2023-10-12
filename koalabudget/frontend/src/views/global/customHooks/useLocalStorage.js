import React, { useState, useEffect} from 'react'

function useLocalStorage(key, initialValue) {
    const [value, setValue ] = useState(() => {
        const localvalue = localStorage.getItem(key)
        if (localvalue === null) {
            if (typeof initialValue === "function") {
                return initialValue()
            } else{
                return initialValue
            }
        } else {
            return JSON.parse(localvalue)

        }
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value])

  return [value, setValue]
}

export default useLocalStorage