export function calculateTotals(initialBudget, setColumnTotals) {
    let budget_total = 0;
        let actual_total = 0;
        let available_total = 0;
        initialBudget?.map(row => {
          budget_total += parseFloat(row.budget);
          actual_total += parseFloat(row.actual);
          available_total += parseFloat(row.available);
        })
        setColumnTotals({budget: budget_total, actual: actual_total, available: available_total})
  }


  //This function sorts the budget by account type, then number
export function sortBudget(budget) {
    // Define the order in which you want to sort the types
    const typeOrder = ["Asset", "Liability", "Income", "Expense"];
  
    // Use the sort() method to sort the array
    budget?.sort((a, b) => {
      const typeA = a.category.type;
      const typeB = b.category.type;
  
      // Use the indexOf method to determine the position of each type in the typeOrder array
      const indexA = typeOrder.indexOf(typeA);
      const indexB = typeOrder.indexOf(typeB);

      //if type is equal, sort by number
      if (indexA === indexB) {
        return a.category.num - b.category.num
      }
  
      // Compare the positions and sort accordingly
      return indexA - indexB;
    });
  
    return budget;
  };


  export function reverseBudgetValues(budget) {
    return budget.map(bud => {
        return ({...bud, 
            budget: parseFloat(-1*bud.budget).toFixed(2), 
            actual : parseFloat(-1*bud.actual).toFixed(2), 
            available: parseFloat(-1*bud.available).toFixed(2)})
  })
  }