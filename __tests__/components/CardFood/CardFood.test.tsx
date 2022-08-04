import React from 'react';
import {
  renderWithThemeProvider,
  matchSnapshotWithProvider,
} from '@/config/functions/Testing';

import CardFood from '@/components/CardFood';

jest.mock('react-hook-form', () => ({
  useController: () => ({
    field: {
      onChange: jest.fn(),
    },
  }),
}));

describe('CardFood', () => {
  const name = 'test';
  const control = jest.fn();
  const maxQuantity = 3;
  const image =
    'https://s3.filebase.com/ioasys-g5-fome-zero/foods/fruits-food.png';

  test('should render correctly', () => {
    renderWithThemeProvider(
      <CardFood
        name={name}
        control={control}
        maxQuantity={maxQuantity}
        image={image}
      />,
    );
  });

  test('should matches snapshot', () => {
    matchSnapshotWithProvider(
      <CardFood
        name={name}
        control={control}
        maxQuantity={maxQuantity}
        image={image}
      />,
    );
  });
});
