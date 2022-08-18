import React from 'react';
import Balance from './balance';
import ButonnAdd from './ButtonAdd';

class Body extends React.Component {
  render() {
    return (
      <div className="balance group">
        <Balance />
        <ButonnAdd />
      </div>
    );
  }
}

export default Body;
