import React from 'react';
import BodySpendign from '../components/SpendingPage/BodySpending/bodySpendingComponent';
import NavBarSpendign from '../components/SpendingPage/NavBar/NavComponentent';

class SpendingPage extends React.Component {
  render() {
    return (
      <div>
        <NavBarSpendign />
        <BodySpendign />
      </div>
    );
  }
}

export default SpendingPage;
