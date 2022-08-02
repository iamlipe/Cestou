import React from 'react';
import {
  renderWithThemeProvider,
  matchSnapshotWithProvider,
} from '@/config/functions/Testing';

import {HomeConsumer} from '@/presentational/HomeScreen/HomeConsumer';

describe('HomeConsumer', () => {
  test('should render screen correctly', () => {
    renderWithThemeProvider(<HomeConsumer />);
  });
  test('should matches snapshot', () => {
    matchSnapshotWithProvider(<HomeConsumer />);
  });
});
