import axios from 'axios';
import React from 'react';
import Loading from '../../LoadingComponent/Loading';

import './index.css';

class FormSpending extends React.Component {
  constructor() {
    super();

    this.state = {
      date: new Date().toISOString().substring(0, 10),
      price: '',
      loading: false,
    };

    this.formSubmit = this.formSubmit.bind(this);
    this.changeDate = this.changeDate.bind(this);
    this.changePrice = this.changePrice.bind(this);
  }

  changeDate(event) {
    this.setState({
      date: event.target.value,
    });
  }

  changePrice(event) {
    this.setState({ price: Number(event.target.value) });
  }

  formSubmit(event) {
    event.preventDefault();
    this.setState({
      loading: true,
    });

    const data = {
      date: this.state.date,
      price: this.state.price,
    };

    axios
      .post('https://my-project-pet.herokuapp.com/spending', data)
      .then((result) => {
        this.setState({
          loading: false,
          price: '',
        });
      })
      .catch((err) => {
        alert('Deu ruim....');
        console.log(err);
        this.setState({
          loading: false,
          price: '',
        });
      });
  }

  render() {
    return (
      <div className="Box">
        <form className="form" onSubmit={this.formSubmit}>
          <input
            type="date"
            name="date"
            placeholder="Date,defaut today"
            value={this.state.date}
            onChange={this.changeDate}
          />
          <input
            type="number"
            step={0.01}
            min={0}
            name="price"
            placeholder="Price your buy"
            value={this.state.price}
            onChange={this.changePrice}
          />
          <div className="flex ai-center div-button column ">
            <button type="submit" className="save" disabled={!this.state.price}>
              Save
            </button>
            {this.state.loading ? <Loading /> : null}
          </div>
        </form>
      </div>
    );
  }
}

export default FormSpending;
