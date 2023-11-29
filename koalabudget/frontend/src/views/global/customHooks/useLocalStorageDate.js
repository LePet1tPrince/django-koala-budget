import { useEffect, useState } from 'react';

import dayjs from "dayjs";

function useLocalStorageDate(key, initialValue) {
    const [value, setValue ] = useState(() => {
        const localvalue = localStorage.getItem(key)
        if (localvalue === null) {
            return initialValue
        } else {
            return dayjs(localvalue)

        }
    })

    useEffect(() => {
        localStorage.setItem(key, value.format("YYYY-MM-DD"))
    }, [value, key])

  return [value, setValue]
}

export default useLocalStorageDate