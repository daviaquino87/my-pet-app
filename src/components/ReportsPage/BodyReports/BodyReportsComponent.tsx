import { api } from '../../../services/api';
import React from 'react';
import Loading from '../../LoadingComponent/Loading';
import './index.css';

class BodyReports extends React.Component {
  state = {
    spendings: null,
  };

  constructor() {
    super();

    this.state = {
      id: null,
    };

    this.ondelete = this.ondelete.bind(this);
  }

  getSpendings() {
    api
      .get('/reports')
      .then((result) => {
        const spendings = result.data;
        this.setState({
          spendings,
        });
      })
      .catch((err) => {
        alert('err: falha no carregamento ');
        console.log(err);
      });
  }

  ondelete(id) {
    const remove = window.confirm('Deseja remover esse item ?');
    if (remove) {
      this.getSpendings();
      api
        .delete(`/spending/${id}`)
        .then((result) => {
          window.top.location.replace('/reports');
        })
        .catch((err) => {
          alert('err: falha ao deletar ');
          console.log(err);
        });
    }
  }

  componentDidMount() {
    this.getSpendings();
  }

  render() {
    return (
      <div className="flex column ai-center conteiner">
        <div className="conteudo flex column ">
          {this.state.spendings != null ? (
            <table className="table-spendings ">
              <thead>
                <tr>
                  <th>Dia</th>
                  <th>Preco</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                {this.state.spendings.map((stay) => (
                  <tr key={stay.id}>
                    <td>{new Date(stay.date).toLocaleDateString()}</td>
                    <td>
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(stay.price)}
                    </td>
                    <td>
                      <button onClick={() => this.ondelete(stay.id)}>
                        &times;
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex ai-center jc-center">
              <Loading />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default BodyReports;
