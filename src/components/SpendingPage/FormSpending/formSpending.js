import { api } from '../../../services/api';
import React from 'react';
import Loading from '../../LoadingComponent/Loading';
import CurrencyInput from 'react-currency-masked-input';

import './index.css';
import Button from '../../Button';

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

  changePrice(event, masked) {
    this.setState({ price: masked });
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

    api
      .post('/spending', data)
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
        <form className="form form-spending " onSubmit={this.formSubmit}>
          <input
            type="date"
            name="date"
            className="my-pet-input"
            placeholder="Date,defaut today"
            value={this.state.date}
            onChange={this.changeDate}
          />
          <CurrencyInput
            type="number"
            step={0.01}
            min={0}
            name="price"
            className="my-pet-input"
            placeholder="Price your buy"
            value={this.state.price}
            onChange={this.changePrice}
          />
          <div className="flex ai-center div-button column ">
            <Button
              label="Save"
              className="save"
              type="submit"
              disabled={!this.state.price}
            />
            {this.state.loading ? <Loading /> : null}
          </div>
        </form>
      </div>
    );
  }
}

export default FormSpending;
