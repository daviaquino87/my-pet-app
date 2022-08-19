import React from 'react';
import './index.css';

class ButonnAdd extends React.Component {
  render() {
    return (
      <a href="/spendings">
        <button className="button-add">+</button>
      </a>
    );
  }
}

export default ButonnAdd;
