import React from "react";
import { Routes, Route } from 'react-router-dom';
import HomeView from "./views/home/HomeView";
import AccountsView from "./views/accounts/AccountsView";
import BudgetView from "./views/budget/BudgetView";
import TransactionsView from "./views/transactions/TransactionsView.jsx";
import DashboardView from "./views/dashboard/DashboardView";
import './styles/main.css';

import Navbar from "./views/global/Navbar";

import Localization from "./Localization.js";
import { Dashboard } from "@mui/icons-material";



function App() {
  return (
    <div>
       {/* <Localization> */}
      <Navbar>
        <Routes>
          <Route exact path="/" element={<HomeView/>} />
          <Route exact path="/transactions" element={<TransactionsView />} />
          <Route exact path="/accounts" element={<AccountsView />} />
          <Route exact path="/budget" element={<BudgetView />} />
          <Route exact path="/dashboard" element={<DashboardView />} />


        </Routes>

      </Navbar>

      {/* </Localization> */}
    
    </div>
  );
}

export default App;
