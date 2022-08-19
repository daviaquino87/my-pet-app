import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';
class Reports extends React.Component {
  render() {
    return (
      <Link to="/reports" className="reports">
        Reports
      </Link>
    );
  }
}

export default Reports;
