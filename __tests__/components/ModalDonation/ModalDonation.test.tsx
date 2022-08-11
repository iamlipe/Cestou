import React from 'react';
import {
  renderWithThemeProvider,
  matchSnapshotWithProvider,
} from '@/config/functions/Testing';

import ModalDonation from '@/components/ModalDonation';

jest.mock('react-hook-form', () => ({
  useController: () => ({
    field: {
      onChange: jest.fn(),
    },
  }),
}));

describe('ModalDonation', () => {
  const name = 'test';
  const control = jest.fn();
  const onConfirm = jest.fn();
  const onCancel = jest.fn();
  const onClose = jest.fn();

  test('should render correctly', () => {
    renderWithThemeProvider(
      <ModalDonation
        name={name}
        control={control}
        onConfirm={onConfirm}
        onCancel={onCancel}
        onClose={onClose}
      />,
    );
  });

  test('should matches snapshot', () => {
    matchSnapshotWithProvider(
      <ModalDonation
        name={name}
        control={control}
        onConfirm={onConfirm}
        onCancel={onCancel}
        onClose={onClose}
      />,
    );
  });

  test('should render error message', () => {
    const modalDonation = renderWithThemeProvider(
      <ModalDonation
        name={name}
        control={control}
        error="someting wrong"
        onConfirm={onConfirm}
        onCancel={onCancel}
        onClose={onClose}
      />,
    );

    const errorText = modalDonation.queryByText('someting wrong');

    expect(errorText).toBeTruthy();
  });
});
