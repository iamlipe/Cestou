import React from 'react';
import {act, fireEvent} from '@testing-library/react-native';
import {
  renderWithThemeProvider,
  matchSnapshotWithProvider,
} from '@/config/functions/testing';

import {Login} from '@/presentational/LoginScreen/Login';

describe('Login', () => {
  test('should render screen correctly', () => {
    renderWithThemeProvider(<Login />);
  });

  test('should matches snapshot', () => {
    matchSnapshotWithProvider(<Login />);
  });

  test('submit form', async () => {
    const {getByTestId, getByText} = renderWithThemeProvider(<Login />);

    const emailInput = getByTestId('input-text-phoneOrEmail');
    const passwordInput = getByTestId('input-text-password');

    fireEvent.changeText(emailInput, 'test@email.com');
    fireEvent.changeText(passwordInput, 'passowrd');

    await act(() => fireEvent.press(getByText(/entrar/i)));

    expect(emailInput.props.value).toEqual('test@email.com');
    expect(passwordInput.props.value).toEqual('passowrd');
  });

  test('should render Logo', () => {
    const {getByTestId} = renderWithThemeProvider(<Login />);

    const logo = getByTestId('logo');

    expect(logo).toBeTruthy();
  });
});
