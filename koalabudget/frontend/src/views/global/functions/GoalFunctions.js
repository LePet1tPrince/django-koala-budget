export function calculateTotals(initialBudget, setColumnTotals) {
    let target_total = 0;
        let saved_total = 0;
        let remainder_total = 0;
        initialBudget?.map(row => {
          target_total += parseFloat(row.target);
          saved_total += parseFloat(row.saved);
          remainder_total += parseFloat(row.remainder);
        })
        setColumnTotals({target: target_total, saved: saved_total, remainder: remainder_total})
  }