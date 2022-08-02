import React from 'react';
import {
  renderWithThemeProvider,
  matchSnapshotWithProvider,
} from '@/config/functions/Testing';

import {Profile} from '@/presentational/ProfileScreen/Profile';

describe('Profile', () => {
  test('should render screen correctly', () => {
    renderWithThemeProvider(<Profile />);
  });

  test('should matches snapshot', () => {
    matchSnapshotWithProvider(<Profile />);
  });
});
