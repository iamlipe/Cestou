import React from 'react';
import {
  renderWithThemeProvider,
  matchSnapshotWithProvider,
} from '@/config/functions/Testing';

import ModalDonation from '@/presentational/DonationScreen/ModalDonation';

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
  const title = 'title';
  const subtitle = 'subtitle';
  const text = 'text';
  const onConfirm = jest.fn();
  const onCancel = jest.fn();
  const onClose = jest.fn();

  test('should render correctly', () => {
    renderWithThemeProvider(
      <ModalDonation
        name={name}
        control={control}
        title={title}
        subtitle={subtitle}
        text={text}
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
        title={title}
        subtitle={subtitle}
        text={text}
        onConfirm={onConfirm}
        onCancel={onCancel}
        onClose={onClose}
      />,
    );
  });

  test('should render title', () => {
    const modalDonation = renderWithThemeProvider(
      <ModalDonation
        name={name}
        control={control}
        title={title}
        subtitle={subtitle}
        text={text}
        onConfirm={onConfirm}
        onCancel={onCancel}
        onClose={onClose}
      />,
    );

    const titleText = modalDonation.queryByText(title);

    expect(titleText).toBeTruthy();
  });

  test('should render subtitle', () => {
    const modalDonation = renderWithThemeProvider(
      <ModalDonation
        name={name}
        control={control}
        title={title}
        subtitle={subtitle}
        text={text}
        onConfirm={onConfirm}
        onCancel={onCancel}
        onClose={onClose}
      />,
    );

    const subtitleText = modalDonation.queryByText(subtitle);

    expect(subtitleText).toBeTruthy();
  });

  test('should render text', () => {
    const modalDonation = renderWithThemeProvider(
      <ModalDonation
        name={name}
        control={control}
        title={title}
        subtitle={subtitle}
        text={text}
        onConfirm={onConfirm}
        onCancel={onCancel}
        onClose={onClose}
      />,
    );

    const textText = modalDonation.queryByText(text);

    expect(textText).toBeTruthy();
  });

  test('should render error message', () => {
    const modalDonation = renderWithThemeProvider(
      <ModalDonation
        name={name}
        control={control}
        title={title}
        subtitle={subtitle}
        text={text}
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
