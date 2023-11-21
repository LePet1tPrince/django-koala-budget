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
  const [ data, setData, isDataLoading, isDataError] = useFetch(`/reports/${dateRange[0].format("YYYY-MM-DD")}/${dateRange[1].format("YYYY-MM-DD")}`)
  const [alignment, setAlignment] = useState('Profit and Loss');
  // const reportTypes = {PNL: "Income v Expense", BS: "Net Worth"}
  const reportTypes = [{name: 'Profit and Loss', filter: ['Income', 'Expense']}, {name:'Balance Sheet', filter: ['Asset','Liability','Equity']}]
  const expenseData = data?.filter(item => item.type === "Expense")
  const incomeData = data?.filter(item => item.type === "Income")
  const assetData = data?.filter(item => item.type === "Asset")
  const liabilityData = data?.filter(item => item.type === "Liability")
  const equityData = data?.filter(item => item.type === "Equity")



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
        <ProfitandLoss dateRange={dateRange} isDataLoading={isDataLoading} incomeData={incomeData} expenseData={expenseData}/>
        : null
      }
      {alignment === reportTypes[1].name?
      <BalanceSheet dateRange={dateRange} isDataLoading={isDataLoading} assetData={assetData} liabilityData={liabilityData} equityData={equityData} />
      :null}
        {/* <ReportPage/> */}
        {/* <ReportTable data={data} reportType={reportTypes.PNL}/> */}
    </div>
  )
}

export default ReportsView