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

      const sub_indexA = typeOrder.indexOf(a.sub_type.sub_type);
      const sub_indexB = typeOrder.indexOf(b.sub_type.sub_type);

      //if type is equal, sort by number
      if (indexA === indexB) {
          if(sub_indexA === sub_indexB) {
            return a.num - b.num
          }
        return sub_indexA - sub_indexB
      }
  
      // Compare the positions and sort accordingly
      return indexA - indexB;
    });
  
    return accounts;
  }