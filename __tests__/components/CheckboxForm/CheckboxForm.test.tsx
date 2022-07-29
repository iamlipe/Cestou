import React from 'react';
import {fireEvent} from '@testing-library/react-native';
import {
  renderWithThemeProvider,
  matchSnapshotWithProvider,
} from '@/config/functions/testing';

import CheckboxForm from '@/components/CheckboxForm';

jest.mock('react-hook-form', () => ({
  useController: () => ({
    field: {
      onChange: jest.fn(),
    },
  }),
}));

describe('CheckboxForm', () => {
  const options = ['check-me', 'check-me-too'];
  const detailsOptions = ['check-me-details', 'check-me-too-details'];

  test('should render correctly', () => {
    renderWithThemeProvider(
      <CheckboxForm name="check" control={jest.fn()} options={options} />,
    );
  });

  test('should matches snapshot', () => {
    matchSnapshotWithProvider(
      <CheckboxForm name="check" control={jest.fn()} options={options} />,
    );
  });

  test('should render all options', () => {
    const checkbox = renderWithThemeProvider(
      <CheckboxForm name="check" control={jest.fn()} options={options} />,
    );

    options.forEach(option => {
      expect(checkbox.getByText(option)).toBeTruthy();
    });
  });

  test('should render error', () => {
    const checkbox = renderWithThemeProvider(
      <CheckboxForm
        name="check"
        control={jest.fn()}
        options={options}
        error="something went wrong"
      />,
    );

    const error = checkbox.getByText(/something went wrong/i);

    expect(error).toBeTruthy();
  });

  test('should starting with no option selected', () => {
    const checkbox = renderWithThemeProvider(
      <CheckboxForm name="check" control={jest.fn()} options={options} />,
    );

    options.forEach((_option, index) => {
      const notCheckedIcon = checkbox.queryByTestId(
        `checkbox-icon-not-checked-${index}`,
      );

      expect(notCheckedIcon).toBeTruthy();
    });
  });

  test('should select option', () => {
    const checkbox = renderWithThemeProvider(
      <CheckboxForm name="check" control={jest.fn()} options={options} />,
    );

    options.forEach((_option, index) => {
      const notCheckedIcon = checkbox.getByTestId(
        `checkbox-icon-not-checked-${index}`,
      );
      expect(notCheckedIcon).toBeTruthy();

      fireEvent.press(notCheckedIcon);

      const checkedIcon = checkbox.getByTestId(
        `checkbox-icon-checked-${index}`,
      );
      expect(checkedIcon).toBeTruthy();
    });
  });

  test('should render with details', () => {
    const checkbox = renderWithThemeProvider(
      <CheckboxForm
        name="check"
        control={jest.fn()}
        options={options}
        detailsOptions={detailsOptions}
      />,
    );

    detailsOptions.forEach(detail => {
      expect(checkbox.getByText(detail)).toBeTruthy();
    });
  });
});
