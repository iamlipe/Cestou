import React from 'react';
import {
  renderWithThemeProvider,
  matchSnapshotWithProvider,
} from '@/config/functions/Testing';
import {fireEvent} from '@testing-library/react-native';
import {act} from 'react-test-renderer';

import {BasketSignupPlanConsumer} from '@/presentational/BasketScreen/BasketSignupPlanConsumer';

describe('BasketSignupPlanConsumer', () => {
  test('should render correctly', () => {
    renderWithThemeProvider(<BasketSignupPlanConsumer />);
  });

  test('should matches snapshot', () => {
    matchSnapshotWithProvider(<BasketSignupPlanConsumer />);
  });

  test('should form submit', async () => {
    const {getAllByTestId, getByTestId, getByText} = renderWithThemeProvider(
      <BasketSignupPlanConsumer />,
    );

    const optionDaysPerDeliver = getAllByTestId('radio-icon-not-checked-1')[0];
    const optionSize = getAllByTestId('radio-icon-not-checked-0')[1];
    const buttonSubmit = getByText(/próximo/i);

    fireEvent.press(optionDaysPerDeliver);
    fireEvent.press(optionSize);

    await act(() => fireEvent.press(buttonSubmit));

    const optionDaysPerDeliverChecked = getByTestId('radio-icon-checked-1');
    const optionSizeChecked = getByTestId('radio-icon-checked-0');

    expect(optionDaysPerDeliverChecked).toBeTruthy();
    expect(optionSizeChecked).toBeTruthy();
  });
});
