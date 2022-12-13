// Coloque aqui suas actions
export const SUBMIT_LOGIN = 'SUBMIT_LOGIN';
export const CURRENCIES_API = 'CURRENCIES_API';

export const submitLogin = (email) => ({
  type: SUBMIT_LOGIN,
  payload: email,
});

export const currenciesAPI = (currencies) => ({
  type: CURRENCIES_API,
  payload: currencies,
});
