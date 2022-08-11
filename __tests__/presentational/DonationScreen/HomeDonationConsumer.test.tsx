import React from 'react';

import {
  renderWithThemeProvider,
  matchSnapshotWithProvider,
} from '@/config/functions/Testing';

import {HomeDonationConsumer} from '@/presentational/DonationScreen/HomeDonationConsumer';

describe('HomeDonationConsumer', () => {
  test('should render screen correctly', () => {
    renderWithThemeProvider(<HomeDonationConsumer />);
  });

  test('should matches snapshot', () => {
    matchSnapshotWithProvider(<HomeDonationConsumer />);
  });
});
