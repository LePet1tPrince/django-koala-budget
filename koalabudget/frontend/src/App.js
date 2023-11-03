import './styles/main.css';

import { Route, Routes } from 'react-router-dom';

import AccountsView from "./views/accounts/AccountsView";
import BudgetView from "./views/budget/BudgetView";
import { Dashboard } from "@mui/icons-material";
import GoalView from "./views/goals/GoalView";
import HomeView from "./views/home/HomeView";
import Localization from "./Localization.js";
import Navbar from "./views/global/Navbar";
import React from "react";
import ReportsView from "./views/reports/ReportsView";
import SettingsView from "./views/settings/SettingsView";
import TestView from "./views/tests/TestView";
import TransactionsView from "./views/transactions/TransactionsView.jsx";

// import DashboardView from "./views/dashboard/DashboardView";











function App() {
  return (
    <div>
       {/* <Localization> */}
      <Navbar>
        <Routes>
          <Route exact path="/" element={<HomeView/>} />
          <Route exact path="/transactions" element={<TransactionsView />} />
          <Route exact path="/accounts" element={<AccountsView />} />
          <Route path="/budget" element={<BudgetView />} />
          <Route path="/reports" element={<ReportsView />} />

          {/* <Route exact path="/budget/dashboard" element={<DashboardView />} /> */}
          <Route exact path="/goals" element={<GoalView />} />
          <Route exact path="/settings" element={<SettingsView />} />
          <Route exact path="/tests" element={<TestView />} />



        </Routes>

      </Navbar>

      {/* </Localization> */}
    
    </div>
  );
}

export default App;
