import React from 'react';
import {
  renderWithThemeProvider,
  matchSnapshotWithProvider,
} from '@/config/functions/Testing';

import {RegisterPixFinancialProducer} from '@/presentational/FinancialScreen/RegisterPixFinancialProducer';
import {fireEvent} from '@testing-library/react-native';
import {act} from 'react-test-renderer';

describe('RegisterPixFinancialProducer', () => {
  test('should render correctly', () => {
    renderWithThemeProvider(<RegisterPixFinancialProducer />);
  });

  test('should matches snapshot', () => {
    matchSnapshotWithProvider(<RegisterPixFinancialProducer />);
  });

  test('should submit form', async () => {
    const {getByTestId, getByText} = renderWithThemeProvider(
      <RegisterPixFinancialProducer />,
    );

    const optionEmail = getByTestId('radio-icon-not-checked-2');
    const inputKey = getByTestId('input-text-pixValue');
    const buttonSubmit = getByText(/registrar chave/i);

    fireEvent.press(optionEmail);
    fireEvent.changeText(inputKey, 'boblee@email.com');

    await act(() => fireEvent.press(buttonSubmit));

    expect(getByTestId('radio-icon-checked-2')).toBeTruthy();
    expect(inputKey.props.value).toEqual('boblee@email.com');
  });
});
