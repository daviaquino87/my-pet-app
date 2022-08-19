import axios from 'axios';
import React from 'react';
import './index.css';
import Loading from '../LoadingComponent/Loading';

class Balance extends React.Component {
  state = {
    balance: null,
  };

  componentDidMount() {
    axios
      .get('https://my-project-pet.herokuapp.com/balance')
      .then((result) => {
        const balance = result.data;
        this.setState({
          balance,
        });
      })
      .catch((err) => {
        alert('err: falha no carregamento ');
        this.setState({
          balance: 0,
        });
        console.log(err);
      });
  }

  render() {
    return (
      <div style={{ height: 80 }}>
        {this.state.balance != null ? (
          <h1>R$ {this.state.balance}</h1>
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}

export default Balance;
