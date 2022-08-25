import React from 'react';
import './index.css';
import Balance from '../BalanceComponente/balance';
import ButonnAdd from '../ButtonComponent/ButtonAdd';
import { Link } from 'react-router-dom';

class Body extends React.Component {
  render() {
    return (
      <div className="balance-group">
        <Link to="/reports">
          <a className="Reports">Reports</a>
        </Link>
        <Balance />
        <ButonnAdd />
      </div>
    );
  }
}

export default Body;
