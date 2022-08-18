import React from 'react';
import Body from '../components/Body';
import NavBar from '../components/NavBar';

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
