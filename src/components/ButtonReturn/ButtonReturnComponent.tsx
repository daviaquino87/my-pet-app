import React from 'react';
import './index.css';

class ButtonReturn extends React.Component {
  render() {
    return (
      <button
        className="button-component"
        onClick={() => window.history.back()}
      >
        <img alt="back" src="/images/back_button.png" />
      </button>
    );
  }
}

export default ButtonReturn;
