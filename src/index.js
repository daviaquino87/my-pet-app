import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import HomePage from './views/home';
import SpendingPage from './views/spending';

class Render extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/spendings" element={<SpendingPage />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<Render />, document.getElementById('root'));
