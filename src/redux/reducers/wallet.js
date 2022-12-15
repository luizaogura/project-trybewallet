// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { CURRENCIES_API, SUBMIT_EXPENSES, DELETE_EXPENSE } from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CURRENCIES_API:
    return {
      ...state,
      currencies: action.payload,
    };

  case SUBMIT_EXPENSES:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        action.payload,
      ],
    };

  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: action.payload,
    };

  default:
    return state;
  }
};

export default wallet;
