import React from 'react';
import {
  matchSnapshotWithProvider,
  renderWithThemeProvider,
} from '@/config/functions/Testing';
import {mockUseParams} from '@__mocks__/mockUseRoute';

import {ConfirmRegister} from '@/presentational/LoginScreen/ConfirmRegister';

describe('ConfirmRegister', () => {
  test('should render screen correctly', () => {
    renderWithThemeProvider(<ConfirmRegister />);
  });

  test('should matches snapshot', () => {
    matchSnapshotWithProvider(<ConfirmRegister />);
  });

  test('should render image welcome producer when loged with producer account', () => {
    mockUseParams.mockReturnValueOnce({userType: 'producer'});

    const {getByTestId} = renderWithThemeProvider(<ConfirmRegister />);

    const welcome = getByTestId('welcome-producer');

    expect(welcome).toBeTruthy();
  });

  test('should render image welcome consumer when loged with consumer account', () => {
    mockUseParams.mockReturnValueOnce({userType: 'consumer'});

    const {getByTestId} = renderWithThemeProvider(<ConfirmRegister />);

    const welcome = getByTestId('welcome-consumer');

    expect(welcome).toBeTruthy();
  });
});
