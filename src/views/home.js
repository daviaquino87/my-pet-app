import React from 'react';
import Body from '../components/HomePage/BodyComponent/Body';
import NavBar from '../components/HomePage/NavbarComponent/NavBar';

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
