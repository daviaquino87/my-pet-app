import axios from 'axios';
import React from 'react';
import Button from '../../components/Button';
import './index.css';

class Body extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
    };

    this.formSubmit = this.formSubmit.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
  }

  changeEmail(event) {
    this.setState({
      email: event.target.value,
    });
  }

  changePassword(event) {
    this.setState({
      email: event.target.value,
    });
  }

  formSubmit(event) {
    event.preventDefault();
    this.setState({
      loading: true,
    });

    const data = {
      email: this.state.email,
      password: this.state.password,
    };

    axios
      .post('https://my-project-pet.herokuapp.com/autentication', data)
      .then((result) => {
        alert('deu bom');
      })
      .catch((err) => {
        alert('Deu ruim....');
        console.log(err);
      });
  }

  render() {
    return (
      <div className="container flex al-center js-center">
        {/* logo */}
        <div className="login-group">
          <form onSubmit={this.formSubmit}>
            <input
              type="text"
              name="name"
              placeholder="price your name"
              className="my-pet-input"
              onChange={this.changeEmail}
            />
            <input
              type="email"
              name="email"
              placeholder="price your email"
              className="my-pet-input"
              onChange={this.changeEmail}
            />
            <input
              type="password"
              name="password"
              className="my-pet-input"
              placeholder="price your password"
              onChange={this.changePassword}
            />
            <Button label="Save" type="submit" className="login" />
          </form>
        </div>
      </div>
    );
  }
}

export default Body;
