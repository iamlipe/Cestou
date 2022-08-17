import React from 'react';
import {
  renderWithThemeProvider,
  matchSnapshotWithProvider,
} from '@/config/functions/testing';

import Info from '@/presentational/LoginScreen/Info';

describe('Info', () => {
  test('should render correctly', () => {
    renderWithThemeProvider(<Info />);
  });

  test('should matches snapshot', () => {
    matchSnapshotWithProvider(<Info />);
  });
});
