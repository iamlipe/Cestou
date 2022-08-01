import React from 'react';
import {
  renderWithThemeProvider,
  matchSnapshotWithProvider,
} from '@/config/functions/Testing';
import {SvgProps} from 'react-native-svg';

import IconMoldal from '@/assets/svgs/vegetable.svg';

import Modal from '@/components/Modal';

describe('Modal', () => {
  test('should rende correctly', () => {
    renderWithThemeProvider(<Modal />);
  });

  test('should matches snapshot', () => {
    matchSnapshotWithProvider(<Modal />);
  });

  test('should render title', () => {
    const modal = renderWithThemeProvider(<Modal title="some title" />);

    const title = modal.getByText(/some title/i);

    expect(title).toBeTruthy();
  });

  test('shoudl render Icon', () => {
    const modal = renderWithThemeProvider(
      <Modal icon={IconMoldal as React.FC<SvgProps>} />,
    );

    const icon = modal.getByTestId('icon-modal');

    expect(icon).toBeTruthy();
  });
});
