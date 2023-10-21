import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useSearchParams } from 'react-router-dom';

// import { StringParam } from 'use-query-params';

export default function ToggleButtonExample() {
    // Initialize the search params
    const [searchParams, setSearchParams] = useSearchParams();
  
    // Get the selected value from search params
    const selectedValue = searchParams.selectedValue || null;
  
    // Function to handle changes when a button is selected
    const handleSelectionChange = (event, newSelectedValue) => {
      setSearchParams({ selectedValue: newSelectedValue });
    };
  
    return (
        <div>
            {selectedValue}

      <ToggleButtonGroup value={selectedValue} exclusive onChange={handleSelectionChange}>
        <ToggleButton value="option1"  style={{ backgroundColor: searchParams.selectedValue === 'option1' ? 'blue' : 'white' }}>Option 1</ToggleButton>
        <ToggleButton value="option2">Option 2</ToggleButton>
        <ToggleButton value="option3">Option 3</ToggleButton>
      </ToggleButtonGroup>
      </div>
    );
  }
//   In this code, we use useSearchParams to manage the selectedValue in the URL. Each ToggleButton has a value prop that should correspond to the value you want to store in the URL. When you select a button, the URL is updated with the selected value, and the color of the selected button should be maintained based on the URL state.
//   
//   Make sure that the value prop for each ToggleButton matches the values you're using for the selectedValue in the URL query parameters. This way, the selected button will be colored based on the value stored in the URL.
  
  
  
  
  
  