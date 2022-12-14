import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { currenciesAPI, submitExpenses } from '../redux/actions/index';

class WalletForm extends Component {
  state = {
    currencies: [],
    responseAPI: [],
    despesa: '',
    descricao: '',
    moeda: 'USD',
    metodo: 'Dinheiro',
    destino: 'Alimentação',
  };

  componentDidMount() {
    this.getAPI();
  }

  getAPI = async () => {
    const { dispatch } = this.props;
    const APIresponse = await fetch('https://economia.awesomeapi.com.br/json/all');
    const results = await APIresponse.json();
    const codein = Object.keys(results).filter((p) => p !== 'USDT');
    this.setState({ currencies: codein, responseAPI: results });
    dispatch(currenciesAPI(codein));
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleClick = () => {
    const { dispatch, expenses } = this.props;
    const { despesa, descricao, moeda, metodo, destino, responseAPI } = this.state;
    this.getAPI();
    const tamanhoArray = expenses.length;
    const expensesArray = {
      id: tamanhoArray,
      value: despesa,
      description: descricao,
      currency: moeda,
      method: metodo,
      tag: destino,
      exchangeRates: responseAPI,
    };
    dispatch(submitExpenses(expensesArray));
    this.setState({
      despesa: '',
      descricao: '',
      moeda: 'USD',
      metodo: 'Dinheiro',
      destino: 'Alimentação',
    });
  };

  render() {
    const { currencies, despesa, descricao, moeda, metodo, destino } = this.state;

    return (
      <div>
        <label htmlFor="despesa">
          Despesa
          <input
            data-testid="value-input"
            onChange={ this.handleChange }
            value={ despesa }
            name="despesa"
          />
        </label>
        <label htmlFor="descrição">
          Descrição
          <input
            data-testid="description-input"
            onChange={ this.handleChange }
            value={ descricao }
            name="descricao"
          />
        </label>
        <select
          data-testid="currency-input"
          onChange={ this.handleChange }
          value={ moeda }
          name="moeda"
        >
          {currencies.map((currency, index) => (
            <option key={ index }>{ currency }</option>
          ))}
        </select>
        <select
          data-testid="method-input"
          onChange={ this.handleChange }
          value={ metodo }
          name="metodo"
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        <select
          data-testid="tag-input"
          onChange={ this.handleChange }
          value={ destino }
          name="destino"
        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
        <button type="button" onClick={ this.handleClick }>Adicionar despesa</button>
      </div>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(WalletForm);
