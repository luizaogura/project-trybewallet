import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { currenciesAPI } from '../redux/actions/index';

class WalletForm extends Component {
  state = {
    currencies: [],
  };

  componentDidMount() {
    this.getAPI();
  }

  getAPI = async () => {
    const { dispatch } = this.props;
    const APIresponse = await fetch('https://economia.awesomeapi.com.br/json/all');
    const results = await APIresponse.json();
    const codein = Object.keys(results).filter((p) => p !== 'USDT');
    console.log(codein);
    this.setState({ currencies: codein });
    dispatch(currenciesAPI(codein));
  };

  render() {
    const { currencies } = this.state;

    return (
      <div>
        <label htmlFor="despesa">
          Despesa
          <input data-testid="value-input" />
        </label>
        <label htmlFor="descrição">
          Descrição
          <input data-testid="description-input" />
        </label>
        <select data-testid="currency-input">
          {currencies.map((moeda, index) => (
            <option key={ index }>{ moeda }</option>
          ))}
        </select>
        <select data-testid="method-input">
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        <select data-testid="tag-input">
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Transporte</option>
        </select>
      </div>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(WalletForm);
