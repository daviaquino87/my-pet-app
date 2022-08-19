import React from 'react';
import './index.css';
import Balance from '../BalanceComponente/balance';
import ButonnAdd from '../ButtonComponent/ButtonAdd';

class Body extends React.Component {
  render() {
    return (
      <div className="balance-group" >
        <Balance />
        <ButonnAdd />
      </div>
    );
  }
}

export default Body;
