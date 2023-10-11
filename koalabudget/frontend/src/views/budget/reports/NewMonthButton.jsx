import React, { useState } from 'react';
import Button  from '@mui/material/Button';
import useFetch from '../../global/apiRequests/useFetch';
import { api_endpoint } from '../../global/apiRequests/global';

function NewMonthButton({selectedMonth, budget}) {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState([])
    const [ accounts, setAccounts, isAccountsLoading, isAccountsError] = useFetch(`/accounts/`)


    function handleClick() {

        function isInBudget(account) {
            const searchBudget = budget.map(item => {
                if(account.id === item.category.id && selectedMonth.format("YYYY-MM") === item.month.slice(0,7)) {
                    return 1
                } else {
                    return 0
                }
            
        })

        let sum = 0;
        for (var i in searchBudget) {
            sum += searchBudget[i]
        }
        if (sum > 0) {
            return true
        }
        return false
    }
        console.log("isInBudget", isInBudget({id: 13}))

        const post_data = accounts.map(acc =>  {
            if ((acc.type ==="Income" || acc.type === "Expense") && !isInBudget(acc)
            ){
            return {"category": acc.id, "month": selectedMonth.format("YYYY-MM-DD"), "budget": 0}}
            return null
        }).filter(n => n)

        console.log("selectedMonth", selectedMonth)
        console.log("data", JSON.stringify(post_data))
        if (post_data.length === 0) {
            alert("All budgets already present in this month")
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
    
            
            // setData(undefined)
            // setIsError(false)
            // setIsLoading(true)
    
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
    <div>
        <Button variant="contained" onClick={handleClick}>Add new Month</Button>
    </div>
  )
}

export default NewMonthButton