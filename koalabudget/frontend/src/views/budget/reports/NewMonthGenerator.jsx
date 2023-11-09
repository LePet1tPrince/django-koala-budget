import React from 'react';
import { api_endpoint } from '../../global/apiRequests/global';
import { useEffect } from 'react';
import useFetch from '../../global/customHooks/useFetch';

function NewMonthGenerator({selectedMonth, budget, setBudget}) {
    const [ accounts, setAccounts, isAccountsLoading, isAccountsError] = useFetch(`/accounts/`)

    useEffect(() => {
        handleNewMonth()
    },[selectedMonth])


    // this function returns true or false on whether the account is already in this month's budget
    function isInBudget(account) {
        let inBudget = false

        budget?.map(item => {
            if(account.id === item.category.id && selectedMonth.format("YYYY-MM") === item.month.slice(0,7)) {
                inBudget = true
            }
    })
    return inBudget

    }

    function PostBudgets(post_data) {
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
    
            })
            .finally(() => {
                
                console.log("Budgetfinal", budget)
                if (controller.signal.aborted) return
    
            })
    
            return () => {
                controller.abort()
            }
        }        


    function handleNewMonth() {
        const post_data = accounts?.map(acc =>  {
            console.log("acc", acc)
            console.log('isinBudget', isInBudget(acc))
            if ((acc.type ==="Income" || acc.type === "Expense" || acc.type === "Goal" ) && !isInBudget(acc)
            ){
            return {"category": acc.id, "month": selectedMonth.format("YYYY-MM-DD"), "budget": 0}}
            return null
        }).filter(n => n)

        console.log("selectedMonth", selectedMonth)
        console.log("data", JSON.stringify(post_data))
        console.log("data_length", post_data?.length)

        console.log("budget1", JSON.stringify([...budget]))


        // if there are no accounts being added, then give the user a heads up and don't make the post request
      
        if (post_data?.length > 0 && !!post_data) {
            PostBudgets(post_data);
        }

        
    }



  return (
    <div>
    </div>
  )
}

export default NewMonthGenerator