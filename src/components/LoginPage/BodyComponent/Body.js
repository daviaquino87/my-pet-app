import axios from 'axios';
import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Button from '../../Button';
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
      .post(`${process.env.REACT_APP_BASE_URL}/autenticate`, data)
      .then((result) => {
        toast.success('Bem vindo!');
        localStorage.setItem('token', result.data.token);
        setTimeout(() => {
          window.top.location.replace('/home');
        }, 600);
      })
      .catch((err) => {
        toast.error('Login invalido!');
        console.log(err);
      });
  }

  render() {
    return (
      <div className="container-login flex column ai-center jc-center">
        <Toaster position="top-center" reverseOrder={false} />
        <div className="image_group">
          <img src="/images/logo.png" alt="logo" className="logo" />
          <img src="/images/logo.png" alt="logo" className="logo-shadow" />
        </div>
        <div className="login-group">
          <form onSubmit={this.formSubmit}>
            <input
              type="email"
              name="email"
              placeholder="price your email"
              className="my-pet-input"
              value={this.state.email}
              onChange={this.changeEmail}
            />
            <input
              type="password"
              name="password"
              className="my-pet-input"
              value={this.state.password}
              placeholder="price your password"
              onChange={this.changePassword}
            />
            <Button label="login" type="submit" className="login" />
          </form>
          <Link to="/register">Don't have a registration? register</Link>
        </div>
      </div>
    );
  }
}

export default Body;
