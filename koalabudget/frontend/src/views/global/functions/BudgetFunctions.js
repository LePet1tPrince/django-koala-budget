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

  export function monthsApart(date1, date2) {
    // Parse the input dates
    const [year1, month1, day1] = date1.split('-').map(Number);
    const [year2, month2, day2] = date2.split('-').map(Number);
  
    // Calculate the difference in months
    const months = (year2 - year1) * 12 + (month2 - month1);
  
    // Adjust for the difference in days
    // const daysInMonth1 = new Date(year1, month1, 0).getDate();
    // const daysInMonth2 = new Date(year2, month2, 0).getDate();
    // const dayDifference = (day2 / daysInMonth2) - (day1 / daysInMonth1);
  
    // // Add the day difference to the months
    // const totalMonths = months + dayDifference;
  
    return months;
  }