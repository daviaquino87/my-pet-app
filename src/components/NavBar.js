import React from 'react';
import Reports from './Repots';

class NavBar extends React.Component {
  render() {
    return (
      <header className="nav-bar-group flex column jc-center">
        <div className="flex ai-center jc-center">
          <img src="/images/logo.png" alt="logo" />
          <h2>myPet</h2>
        </div>
        <div className="flex center jc-center">
          <Reports />
        </div>
      </header>
    );
  }
}

export default NavBar;
