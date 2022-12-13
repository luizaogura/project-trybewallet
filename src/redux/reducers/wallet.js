// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { CURRENCIES_API } from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CURRENCIES_API:
    return {
      ...state,
      currencies: action.payload,
    };
  default:
    return state;
  }
};

export default wallet;
