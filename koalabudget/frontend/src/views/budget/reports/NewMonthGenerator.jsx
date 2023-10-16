import React, { useState } from 'react';
import Button  from '@mui/material/Button';
import useFetch from '../../global/apiRequests/useFetch';
import { api_endpoint } from '../../global/apiRequests/global';
import AccountDeleteDialogue from '../../accounts/accountsTable/AccountDeleteDialogue';
import { useEffect } from 'react';

function NewMonthGenerator({selectedMonth, budget, setBudget}) {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState([])
    const [ accounts, setAccounts, isAccountsLoading, isAccountsError] = useFetch(`/accounts/`)

    useEffect(() => {
        handleClick()
    },[selectedMonth])


    function isInBudget(account) {
        let inBudget = false
        // for (let i = 1; i < budget.length; i++) {
        //     if (account.id === budget[i].category.id && selectedMonth.format("YYYY-MM") === budget[i].month.slice(0,7)) {
        //         return true
        //     }
        // }
        budget?.map(item => {
            if(account.id === item.category.id && selectedMonth.format("YYYY-MM") === item.month.slice(0,7)) {
                inBudget = true
            }
    })
    return inBudget

}

    function handleClick() {

        // console.log("isInBudget", isInBudget({id: 13}))

        const post_data = accounts?.map(acc =>  {
            if ((acc.type ==="Income" || acc.type === "Expense") && !isInBudget(acc)
            ){
            return {"category": acc.id, "month": selectedMonth.format("YYYY-MM-DD"), "budget": 0}}
            return null
        }).filter(n => n)

        console.log("selectedMonth", selectedMonth)
        console.log("data", JSON.stringify(post_data))
        console.log("budget1", JSON.stringify([...budget]))


        // if there are no accounts being added, then give the user a heads up and don't make the post request
        if (post_data?.length === 0) {
            
            // alert("All budgets already present in this month")
            return 
        }

       
        const url = '/budget/new-month'
    
        const options = {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              },
              body: JSON.stringify(post_data)
            };
    
    
            const controller = new AbortController()
    
            fetch(`${api_endpoint}${url}`, { signal: controller.signal, ...options})
            .then(response => response.json())
            .then(responsejson => {
                const data = responsejson.map(item => {
                    return {
                        "id": item.id,
                        "category": accounts.filter(acc => acc.id === item.category)[0],
                        "month" :item.month,
                        "budget": item.budget,
                        "actual" : item.actual,
                        "available": item.available
                    }

                })
                console.log("budget2", JSON.stringify([...budget]))
                console.log("responsejston", JSON.stringify(responsejson))
                console.log("compone", [...budget, ...data])
                setBudget([...budget, ...data])
            })
            .catch((e) => {
                if (e.name === "AbortError") return
    
                setIsError(true)
            })
            .finally(() => {
                
                console.log("Budgetfinal", budget)
                // setBudget([...budget, ])
                if (controller.signal.aborted) return
    
                setIsLoading(false)
            })
    
            return () => {
                controller.abort()
            }
    }        


  return (
    <div>
        {/* <Button variant="contained" onClick={handleClick}>Add new Month</Button> */}
    </div>
  )
}

export default NewMonthGenerator