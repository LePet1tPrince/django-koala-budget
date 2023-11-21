import React, { useState } from 'react';

import BalanceSheet from './BalanceSheet.jsx';
import DateController from './DateController';
import DateRangePicker from './DateRangePicker';
import Grid from '@mui/material/Grid';
import ProfitandLoss from './ProfitandLoss.jsx';
import ReportPage from './ReportPage';
import ReportTable from './ReportTable'
import ReportsToggle from './ReportsToggle.jsx';
import dayjs from 'dayjs';
import useFetch from '../global/customHooks/useFetch.js';

function ReportsView() {
  const [dateRange, setDateRange] = useState([dayjs('2023-04-17'),dayjs('2023-05-17')]);
  const [ rangeData, setRangeData, isRangeDataLoading, isRangeDataError] = useFetch(`/reports/${dateRange[0].format("YYYY-MM-DD")}/${dateRange[1].format("YYYY-MM-DD")}`)
  const [ PITData, setPITData, isPITDataLoading, isPITDataError] = useFetch(`/cumulative-reports/${dateRange[1].format("YYYY-MM-DD")}`)

  const [alignment, setAlignment] = useState('Profit and Loss');
  // const reportTypes = {PNL: "Income v Expense", BS: "Net Worth"}
  const reportTypes = [{name: 'Profit and Loss', filter: ['Income', 'Expense']}, {name:'Balance Sheet', filter: ['Asset','Liability','Equity']}]
  const expenseData = rangeData?.filter(item => item.type === "Expense")
  const incomeData = rangeData?.filter(item => item.type === "Income")
  const assetData = PITData?.filter(item => item.type === "Asset")
  const liabilityData = PITData?.filter(item => item.type === "Liability")
  const equityData = PITData?.filter(item => item.type === "Equity" || item.type == "Goal")
  // const goalData = PITData?.filter(item => item.type === "Goal")




//   accounts, selectedAccountId, setSelectedAccountId
  return (
    <div>
        <Grid container spacing={3}>
            <Grid item xs={4}>
                <DateController setValue={setDateRange}/>

            </Grid>
            <Grid item xs={8}>
                <DateRangePicker value={dateRange} setValue={setDateRange}/>

            </Grid>

        </Grid>
        <ReportsToggle reportTypes={reportTypes} alignment={alignment} setAlignment={setAlignment}/>
        {alignment === reportTypes[0].name?
        <ProfitandLoss dateRange={dateRange} isRangeDataLoading={isRangeDataLoading} incomeData={incomeData} expenseData={expenseData}/>
        : null
      }
      {alignment === reportTypes[1].name?
      <BalanceSheet dateRange={dateRange} isPITDataLoading={isPITDataLoading} assetData={assetData} liabilityData={liabilityData} equityData={equityData} />
      :null}
        {/* <ReportPage/> */}
        {/* <ReportTable data={data} reportType={reportTypes.PNL}/> */}
    </div>
  )
}

export default ReportsView