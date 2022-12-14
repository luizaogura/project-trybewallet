import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Testa o componente <Login.js />', () => {
  test('Testa se a página de login é carregada', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');

    const email = screen.getByText(/Insira seu email:/i);
    const senha = screen.getByText(/Senha:/i);
    expect(email).toBeInTheDocument();
    expect(senha).toBeInTheDocument();
  });

  test('Testa se é possivel escrever nos inputs', () => {
    const { getByTestId } = renderWithRouterAndRedux(<App />);
    const emailInput = getByTestId('email-input');
    userEvent.type(emailInput, 'Luiza');
    expect(emailInput).toHaveDisplayValue('Luiza');

    const passwordInput = getByTestId('password-input');
    userEvent.type(passwordInput, '123');
    expect(passwordInput).toHaveDisplayValue('123');
  });

  test('Testa se o botão, quando clicado, redireciona para a página /carteira', async () => {
    const { getByRole, history } = renderWithRouterAndRedux(<App />);
    const loginBtn = getByRole('button', { name: 'Entrar' });
    expect(loginBtn).toBeInTheDocument();

    const emailInput = screen.getByTestId('email-input');
    userEvent.type(emailInput, 'luizapogura@gmail.com');
    expect(emailInput).toHaveDisplayValue('luizapogura@gmail.com');

    const passwordInput = screen.getByTestId('password-input');
    userEvent.type(passwordInput, '123456');
    expect(passwordInput).toHaveDisplayValue('123456');

    expect(loginBtn.disabled).toBe(false);
    userEvent.click(loginBtn);
    const { pathname } = history.location;

    await waitFor(() => {
      expect(pathname).toBe('/carteira');
    });
  });
});
