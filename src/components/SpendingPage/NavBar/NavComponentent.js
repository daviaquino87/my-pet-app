import React from 'react';
import ButtonReturn from '../../ButtonReturn/ButtonReturnComponent';
import './index.css';

class NavBarSpendign extends React.Component {
  render() {
    return (
      <div className="Nav-bar">
        <div className="container">
          <ButtonReturn />
          <h2>new Buy</h2>
        </div>
      </div>
    );
  }
}

export default NavBarSpendign;