import React from 'react';

import {
  renderWithThemeProvider,
  matchSnapshotWithProvider,
} from '@/config/functions/Testing';

import {ConfirmDonations} from '@/presentational/DonationScreen/ConfirmDonation';

describe('ConfirmDonations', () => {
  test('should render screen correctly', () => {
    renderWithThemeProvider(<ConfirmDonations />);
  });

  test('should matches snapshot', () => {
    matchSnapshotWithProvider(<ConfirmDonations />);
  });
});
