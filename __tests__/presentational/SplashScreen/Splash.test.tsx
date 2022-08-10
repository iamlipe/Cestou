import React from 'react';
import {
  renderWithThemeProvider,
  matchSnapshotWithProvider,
} from '@/config/functions/Testing';

import {Splash} from '@/presentational/SplashScreen/Splash';

describe('Splash', () => {
  test('should screen render correctly', () => {
    renderWithThemeProvider(<Splash />);
  });

  test('should matches snapshot', () => {
    matchSnapshotWithProvider(<Splash />);
  });
});
