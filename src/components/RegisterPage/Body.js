import axios from 'axios';
import React from 'react';
import Button from '../../components/Button';
import toast, { Toaster } from 'react-hot-toast';
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
        toast.success('everything worked! please login');
        window.top.location.replace('/');
      })
      .catch((err) => {
        toast.error('Something went wrong...');
        setTimeout(() => {
          toast('obs: your password must contain more than 6 characters', {
            icon: '⚠️',
          });
        }, 1000);
        console.log(err.response.data);
        console.log(err);
      });
  }

  render() {
    return (
      <div className="container flex column ai-center jc-center">
        <Toaster position="top-center" reverseOrder={false} />
        <img className="curioso" src="/images/curioso.png" />
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
            className="button-retorno"
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
