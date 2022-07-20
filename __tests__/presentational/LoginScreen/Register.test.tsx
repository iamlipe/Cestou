import React from 'react';
import {act, fireEvent, render} from '@testing-library/react-native';
import {
  renderWithThemeProvider,
  matchSnapshotWithProvider,
} from '@/config/functions/testing';

import {Register} from '@/presentational/LoginScreen/Register';

describe('Register', () => {
  test('should render screen correctly', () => {
    renderWithThemeProvider(<Register />);
  });

  test('should matches snapshot', () => {
    matchSnapshotWithProvider(<Register />);
  });

  test('should render title', () => {
    const {getByText} = renderWithThemeProvider(<Register />);

    const title = getByText(/criar conta/i);

    expect(title).toBeTruthy();
  });

  test('should submit form', async () => {
    const {getByTestId, getByText} = renderWithThemeProvider(<Register />);

    const userTypeRadio = getByTestId('radio-icon-not-checked-1');
    const nameInput = getByTestId('input-text-name');
    const emailInput = getByTestId('input-text-email');
    const passwordInput = getByTestId('input-text-password');
    const termsCheckbox = getByTestId('checkbox-icon-not-checked-0');
    const submitButton = getByText(/finalizar cadastro/i);

    fireEvent.press(userTypeRadio);
    fireEvent.changeText(nameInput, 'Mason Mount');
    fireEvent.changeText(emailInput, 'mount@email.com');
    fireEvent.changeText(passwordInput, 'password');
    fireEvent.press(termsCheckbox);

    await act(() => fireEvent.press(submitButton));

    expect(getByTestId('radio-icon-checked-1')).toBeTruthy();
    expect(nameInput.props.value).toEqual('Mason Mount');
    expect(emailInput.props.value).toEqual('mount@email.com');
    expect(passwordInput.props.value).toEqual('password');
    expect(getByTestId('checkbox-icon-checked-0')).toBeTruthy();
  });
});
