import React, { useState } from 'react';

import Button from '@mui/material/Button';
import { ReactSpreadsheetImport } from "react-spreadsheet-import";
import { api_endpoint } from '../../global/apiRequests/global';

function CreateMultipleTransactions({activeAccountId, accounts}) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState([])

  const accountObject = accounts? accounts.filter(acc => acc.id === activeAccountId)[0]:{}

  function openImporter() {
    setIsOpen(!isOpen)
  }

  function onClose() {
    // console.log('clothes!')
    setIsOpen(false)
  }

  function onSubmit(data, file) {
    const all_data = data.all
    console.log('submitted', all_data)
    console.log("file", file)
    const url = '/transactions/createmultiple'

    const post_data = all_data.map(row => {
      if (row.inflow > 0)
      return {
        date: row.date,
        amount: row.inflow,
        debit: activeAccountId,
        credit: accounts.find(acc => acc.name === "Uncategorized").id,
        notes: row.notes
      }
      else if (row.outflow >0) {
        return {
          date: row.date,
          amount: row.outflow,
          debit: accounts.find(acc => acc.name === "Uncategorized").id,
          credit: activeAccountId,
          notes: row.notes
        }
      }
      return null;
      
    })
    console.log("post_data", post_data)

    const options = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify(post_data)
        };

        
        setData(undefined)
        setIsError(false)
        setIsLoading(true)

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

  const fields = [
    {
      label: "Date",
      key: 'date',
      alternateMatches: ['day'],
      fieldType: {
        type: "input"
      },
      example: "2023-12-31",
      validations: [
        {
          rule: "required",
          errorMessage: "date is required",
          level: "error"
        }
      ]
    },
    {
      label: "Inflow",
      key: 'inflow',
      alternateMatches: ['deposited', 'deposit'],
      fieldType: {
        type: "input"
      },
      example: "45.62",
    },
    {
      label: "Outflow",
      key: 'outflow',
      alternateMatches: ['withdraw', 'withdrawal', 'withdrawn'],
      fieldType: {
        type: "input"
      },
      example: "145.23",
    },
    {
      label: "Notes",
      key: 'notes',
      alternateMatches: ['description', 'payee', 'Memo'],
      fieldType: {
        type: "input"
      },
      example: "A short description about the transaction.",
    }
  ]

  return (
    <div>
      <Button variant="contained" onClick={openImporter}>Bulk Upload to {accountObject.name}</Button>
      <ReactSpreadsheetImport 
      isOpen={isOpen} 
      onClose={onClose} 
      onSubmit={onSubmit} 
      fields={fields} 
      translations={{
        uploadStep: {
          title: `Upload Transactions to ${accountObject.name} - ${accountObject.num}`,
        },
      }}
      />

    </div>
  )
}

export default CreateMultipleTransactions