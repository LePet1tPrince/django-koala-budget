//sort accounts by account type and then by number
export function sortAccounts(accounts) {
    // Define the order in which you want to sort the types
    const typeOrder = ["Asset", "Liability", "Income", "Expense", "Equity"];
  
    // Use the sort() method to sort the array
    accounts?.sort((a, b) => {
      const typeA = a.type;
      const typeB = b.type;
  
      // Use the indexOf method to determine the position of each type in the typeOrder array
      const indexA = typeOrder.indexOf(typeA);
      const indexB = typeOrder.indexOf(typeB);

      //if type is equal, sort by number
      if (indexA === indexB) {
        return a.num - b.num
      }
  
      // Compare the positions and sort accordingly
      return indexA - indexB;
    });
  
    return accounts;
  }