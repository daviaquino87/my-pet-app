import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

class ButonnAdd extends React.Component {
  render() {
    return (
      <Link to="/spendings">
        <button className="button-add">+</button>
      </Link>
    );
  }
}

export default ButonnAdd;
