import React from 'react';
import {
  renderWithThemeProvider,
  matchSnapshotWithProvider,
} from '@/config/functions/Testing';

import Counter from '@/components/Counter';
import {fireEvent} from '@testing-library/react-native';

jest.mock('react-hook-form', () => ({
  useController: () => ({
    field: {
      onChange: jest.fn(),
    },
  }),
}));

describe('Counter', () => {
  const control = jest.fn();
  const name = 'test';

  test('should render correctly', () => {
    renderWithThemeProvider(<Counter name={name} control={control} />);
  });

  test('should matches snapshot', () => {
    matchSnapshotWithProvider(<Counter name={name} control={control} />);
  });

  test('should render with max quantity correctly', () => {
    const counter = renderWithThemeProvider(
      <Counter name={name} control={control} maxQuantity={5} />,
    );

    const inputCounter = counter.getByTestId('counter-test');

    expect(inputCounter.props.value).toEqual('5');
  });

  test('should change value input to more one when press increment button', () => {
    const counter = renderWithThemeProvider(
      <Counter name={name} control={control} />,
    );

    const incrementButton = counter.getByTestId('increment-button');

    fireEvent.press(incrementButton);

    const inputCounter = counter.getByTestId('counter-test');

    expect(inputCounter.props.value).toEqual('1');
  });

  test('should change value input to minus one when press decrement button', () => {
    const counter = renderWithThemeProvider(
      <Counter name={name} control={control} maxQuantity={3} />,
    );

    const decrementButton = counter.getByTestId('decrement-button');

    fireEvent.press(decrementButton);

    const inputCounter = counter.getByTestId('counter-test');

    expect(inputCounter.props.value).toEqual('2');
  });

  test('should not increment value when the new value is bigger then maxQuantity', () => {
    const counter = renderWithThemeProvider(
      <Counter name={name} control={control} maxQuantity={3} />,
    );

    const incrementButton = counter.getByTestId('increment-button');

    fireEvent.press(incrementButton);

    const inputCounter = counter.getByTestId('counter-test');

    expect(inputCounter.props.value).toEqual('3');
  });

  test('should not decrement value when the new value is less then 0', () => {
    const counter = renderWithThemeProvider(
      <Counter name={name} control={control} />,
    );

    const decrementButton = counter.getByTestId('decrement-button');

    fireEvent.press(decrementButton);

    const inputCounter = counter.getByTestId('counter-test');

    expect(inputCounter.props.value).toEqual('0');
  });
});
