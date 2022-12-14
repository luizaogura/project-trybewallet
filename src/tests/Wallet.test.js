import React from 'react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';

describe('Testa o componente <Wallet.js />', () => {
  test('Testa se a página de carteira é carregada e se é possivel escrever nos inputs', () => {
    const { getByTestId } = renderWithRouterAndRedux(<Wallet />);

    const despesaInput = getByTestId('value-input');
    const descricaoInput = getByTestId('description-input');
    const moeda = getByTestId('currency-input');
    const metodo = getByTestId('method-input');
    const tag = getByTestId('tag-input');

    expect(despesaInput).toBeInTheDocument();
    expect(descricaoInput).toBeInTheDocument();
    expect(moeda).toBeInTheDocument();
    expect(metodo).toBeInTheDocument();
    expect(tag).toBeInTheDocument();

    userEvent.type(despesaInput, '12 reais');
    expect(despesaInput).toHaveDisplayValue('12 reais');
    userEvent.type(descricaoInput, 'pastel de queijo');
    expect(descricaoInput).toHaveDisplayValue('pastel de queijo');
    userEvent.selectOptions(metodo, 'Cartão de crédito');
    expect(metodo).toHaveDisplayValue('Cartão de crédito');
    userEvent.selectOptions(tag, 'Lazer');
    expect(tag).toHaveDisplayValue('Lazer');
  });
});
