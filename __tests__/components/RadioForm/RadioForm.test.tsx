import React from 'react';
import {
  renderWithThemeProvider,
  matchSnapshotWithProvider,
} from '@/config/functions/testing';

import RadioForm from '@/components/RadioForm';
import {fireEvent} from '@testing-library/react-native';

jest.mock('react-hook-form', () => ({
  useController: () => ({
    field: {
      onChange: jest.fn(),
    },
  }),
}));

describe('RadioForm', () => {
  const options = ['radio-me', 'radio-me-too'];

  test('should render correctly', () => {
    renderWithThemeProvider(
      <RadioForm name="radio" control={jest.fn()} options={options} />,
    );
  });

  test('should matches snapshot', () => {
    matchSnapshotWithProvider(
      <RadioForm name="radio" control={jest.fn()} options={options} />,
    );
  });

  test('should render all options', () => {
    const radio = renderWithThemeProvider(
      <RadioForm name="radio" control={jest.fn()} options={options} />,
    );

    options.forEach(option => {
      expect(radio.getByText(option)).toBeTruthy();
    });
  });

  test('should starting with no option selected', () => {
    const radio = renderWithThemeProvider(
      <RadioForm name="radio" control={jest.fn()} options={options} />,
    );

    options.forEach((_option, index) => {
      const notCheckedIcon = radio.queryByTestId(
        `radio-icon-not-checked-${index}`,
      );

      expect(notCheckedIcon).toBeTruthy();
    });
  });

  test('should select option', () => {
    const radio = renderWithThemeProvider(
      <RadioForm name="radio" control={jest.fn()} options={options} />,
    );

    options.forEach((_option, index) => {
      const notCheckedIcon = radio.getByTestId(
        `radio-icon-not-checked-${index}`,
      );

      expect(notCheckedIcon).toBeTruthy();

      fireEvent.press(notCheckedIcon);

      const radioIcon = radio.queryByTestId(`radio-icon-checked-${index}`);

      expect(radioIcon).toBeTruthy();
    });
  });
});
