// Coloque aqui suas actions
export const SUBMIT_LOGIN = 'SUBMIT_LOGIN';
export const CURRENCIES_API = 'CURRENCIES_API';
export const SUBMIT_EXPENSES = 'SUBMIT_EXPENSES';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const submitLogin = (email) => ({
  type: SUBMIT_LOGIN,
  payload: email,
});

export const currenciesAPI = (currencies) => ({
  type: CURRENCIES_API,
  payload: currencies,
});

export const submitExpenses = (expenses) => ({
  type: SUBMIT_EXPENSES,
  payload: expenses,
});

export const deleteExpense = (id) => ({
  type: DELETE_EXPENSE,
  payload: id,
});
