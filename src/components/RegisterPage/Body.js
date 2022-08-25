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
      password: event.target.value,
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
      .post(`${process.env.REACT_APP_BASE_URL}/register`, data)
      .then((result) => {
        alert('deu bom');
        window.top.location.replace('/');
      })
      .catch((err) => {
        alert('Deu ruim....');
        console.log(err);
      });
  }

  render() {
    return (
      <div className="container flex column ai-center jc-center">
        {/* logo */}
        <div className="login-group-register">
          <form onSubmit={this.formSubmit}>
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
          <a
            href="#back"
            onClick={(event) => {
              event.preventDefault();
              window.history.back();
            }}
          >
            back to login
          </a>
        </div>
      </div>
    );
  }
}

export default Body;
