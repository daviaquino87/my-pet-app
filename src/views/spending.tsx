import React from 'react';
import BodySpendign from '../components/SpendingPage/BodySpending/bodySpendingComponent';
import NavBar from '../components/NavBar/index';

class SpendingPage extends React.Component {
  render() {
    return (
      <div>
        <NavBar title="Buy" canBack />
        <BodySpendign />
      </div>
    );
  }
}

export default SpendingPage;
