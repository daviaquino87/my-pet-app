import React from 'react';
import Body from '../components/BodyComponent/Body';
import NavBar from '../components/NavbarComponent/NavBar';

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <NavBar />,
        <Body />
      </div>
    );
  }
}

export default HomePage;
