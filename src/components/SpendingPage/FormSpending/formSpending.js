import React from 'react';
import './index.css';

class FormSpending extends React.Component {
  render() {
    return (
      <form className="form">
        <input type="text" placeholder="Date,defaut today" />
        <input type="number" placeholder="Price your buy" />
        <button type="submit">Save</button>
      </form>
    );
  }
}

export default FormSpending;
