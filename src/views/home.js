import React from 'react';
import { Link } from 'react-router-dom';
import Body from '../components/HomePage/BodyComponent/Body';
import NavBar from '../components/NavBar';

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <NavBar title="myPet" />

        <Body />
      </div>
    );
  }
}

export default HomePage;
