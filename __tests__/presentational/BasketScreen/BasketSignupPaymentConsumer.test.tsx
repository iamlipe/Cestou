import React from 'react';
import {
  renderWithThemeProvider,
  matchSnapshotWithProvider,
} from '@/config/functions/Testing';

import {mockValueBasket} from '@__mocks__/mockUseGetConsumerBasket';

import {BasketSignupPaymentConsumer} from '@/presentational/BasketScreen/BasketSignupPaymentConsumer';
import {act, fireEvent} from '@testing-library/react-native';

describe('BasketSignupPaymentConsumer', () => {
  test('should screen render correctly', () => {
    renderWithThemeProvider(<BasketSignupPaymentConsumer />);
  });

  test('should matches snapshot', () => {
    matchSnapshotWithProvider(<BasketSignupPaymentConsumer />);
  });

  test('should render total price basket correctly', () => {
    mockValueBasket.mockReturnValueOnce('270.00');

    const {getAllByText} = renderWithThemeProvider(
      <BasketSignupPaymentConsumer />,
    );

    const totalPrice = getAllByText('R$ 270.00');

    expect(totalPrice).toBeTruthy();
  });

  test('should submit form', async () => {
    const {getByTestId, getByText} = renderWithThemeProvider(
      <BasketSignupPaymentConsumer />,
    );

    const optionDelivery = getByTestId('radio-icon-not-checked-1');
    const buttonSubmit = getByText(/concluir compra/i);

    fireEvent.press(optionDelivery);

    await act(() => fireEvent.press(buttonSubmit));

    const optionDeliveryChecked = getByTestId('radio-icon-checked-1');

    expect(optionDeliveryChecked).toBeTruthy();
  });
});
