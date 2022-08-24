import React from 'react';
import { api } from '../../../services/api';
import Loading from '../../LoadingComponent/Loading';
import './index.css';

class Balance extends React.Component {
  state = {
    balance: null,
  };

  componentDidMount() {
    api
      .get('/balance')
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
          <h1>
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(this.state.balance)}
          </h1>
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}

export default Balance;
