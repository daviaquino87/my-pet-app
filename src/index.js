import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import HomePage from './views/home';
import ReportsPage from './views/reports';
import SpendingPage from './views/spending';

class Render extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/spendings" element={<SpendingPage />} />
          <Route path="/reports" element={<ReportsPage />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

const root = document.getElementById('root');
const rootCreate = createRoot(root);

rootCreate.render(<Render />);
