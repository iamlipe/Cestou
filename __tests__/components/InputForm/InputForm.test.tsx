import React from 'react';
import {fireEvent} from '@testing-library/react-native';
import {
  renderWithThemeProvider,
  matchSnapshotWithProvider,
} from '@/config/functions/testing';

import InputForm from '@/components/InputForm';

describe('InputForm', () => {
  const name = 'default';
  const errorMessage = 'someting went wrong';
  const control = jest.fn();

  test('should render correctly', () => {
    renderWithThemeProvider(<InputForm name={name} control={control} />);
  });

  test('should matches snapshot', () => {
    matchSnapshotWithProvider(<InputForm name={name} control={control} />);
  });

  test('should not render icon visibility when secureTextEntry is false', () => {
    const inputForm = renderWithThemeProvider(
      <InputForm name={name} control={control} />,
    );

    const input = inputForm.getByTestId(`input-text-${name}`);
    const visibilityIcon = inputForm.queryByTestId('visibility-icon');

    expect(visibilityIcon).toBeFalsy();
    expect(input.props.secureTextEntry).toBeFalsy();
  });

  test('should render icon visibility when secureTextEntry is true', () => {
    const inputForm = renderWithThemeProvider(
      <InputForm name={name} control={control} secureTextEntry />,
    );

    const input = inputForm.getByTestId(`input-text-${name}`);
    const visibilityIcon = inputForm.getByTestId('visibility-icon');

    expect(visibilityIcon).toBeTruthy();
    expect(input.props.secureTextEntry).toBeTruthy();
  });

  test('should render icon visibility-off when press button visibilty and return to visibiliy when press again', () => {
    const inputForm = renderWithThemeProvider(
      <InputForm name={name} control={control} secureTextEntry />,
    );

    const input = inputForm.getByTestId(`input-text-${name}`);
    const visibilityIcon = inputForm.getByTestId('visibility-icon');

    expect(visibilityIcon).toBeTruthy();
    expect(input.props.secureTextEntry).toBeTruthy();

    fireEvent.press(visibilityIcon);

    const visibilityOffIcon = inputForm.getByTestId('visibility-off-icon');
    expect(visibilityOffIcon).toBeTruthy();
    expect(input.props.secureTextEntry).toBeFalsy();

    fireEvent.press(visibilityOffIcon);

    expect(visibilityIcon).toBeTruthy();
    expect(input.props.secureTextEntry).toBeTruthy();
  });

  test('should render icon error when pass error to inputForm', () => {
    const inputForm = renderWithThemeProvider(
      <InputForm name={name} control={control} error={errorMessage} />,
    );

    const errorIcon = inputForm.getByTestId('error-icon');

    expect(errorIcon).toBeTruthy();
  });

  test('should render a message with a error when pass a error to inputForm', () => {
    const inputForm = renderWithThemeProvider(
      <InputForm name={name} control={control} error={errorMessage} />,
    );

    const errorText = inputForm.getByText(errorMessage);

    expect(errorText).toBeTruthy();
  });
});
