export function calculateGoalBalances(accounts, goals, setBalances) {
    const bal_accounts = accounts?.filter(acc => acc.type === "Asset" || acc.type === "Liability")
    
    let gross_account_bal = 0 
    let goal_bal = 0

    // //sum the balance of all balance sheet accounts
    bal_accounts?.map(acc => {
        if (acc.balance) {
            gross_account_bal += parseFloat(acc.balance)
            console.log(acc)

        }
    });
    
    // //sum the amount put towards all goals so far
    goals?.map(goal => {
        if (goal.saved) {
            goal_bal += parseFloat(goal.saved)
        }
    })

    // console.log("balance accounts", JSON.stringify(bal_accounts))
    // console.log("balance", goal_bal)
    // console.log('gorss_acco8unt_bal', gross_account_bal)
    setBalances([gross_account_bal, goal_bal])
    // return bal_accounts

}