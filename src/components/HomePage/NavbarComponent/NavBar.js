import React from 'react';
import './index.css';
import Reports from '../ReportComponent/Repots';

class NavBar extends React.Component {
  render() {
    return (
      <header className="nav-bar-group flex column jc-center">
        <div className="flex ai-center jc-center group-nav-itens">
          <div className="image_group">
            <img src="/images/logo.png" alt="logo" className="logo" />
            <img src="/images/logo.png" alt="logo" className="logo-shadow" />
          </div>
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
