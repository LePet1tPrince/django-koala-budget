import React, { useEffect, useState } from 'react'

function useTransactionForm(formInputIntialState) {
  const [formData, setFormData] = useState(formInputIntialState);
  const [open, setOpen] = useState(false);


  const toggleOpen = () => {
    setOpen(!open);
  };



  return [formData, setFormData, open, toggleOpen]
}

export default useTransactionForm