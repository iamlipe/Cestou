import React from 'react';
import {
  matchSnapshotWithProvider,
  renderWithThemeProvider,
} from '@/config/functions/Testing';

import {ConfirmRegister} from '@/presentational/LoginScreen/ConfirmRegister';

describe('ConfirmRegister', () => {
  test('should render screen correctly', () => {
    renderWithThemeProvider(<ConfirmRegister />);
  });

  test('should matches snapshot', () => {
    matchSnapshotWithProvider(<ConfirmRegister />);
  });

  test('should render image welcome producer when loged with producer account', () => {
    const {getByTestId} = renderWithThemeProvider(<ConfirmRegister />, {
      user: {auth: {userType: 'producer'}},
    });

    const welcome = getByTestId('welcome-producer');

    expect(welcome).toBeTruthy();
  });

  test('should render image welcome consumer when loged with consumer account', () => {
    const {getByTestId} = renderWithThemeProvider(<ConfirmRegister />, {
      user: {auth: {userType: 'consumer'}},
    });

    const welcome = getByTestId('welcome-consumer');

    expect(welcome).toBeTruthy();
  });
});
