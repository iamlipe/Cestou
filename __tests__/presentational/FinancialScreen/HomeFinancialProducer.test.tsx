import React from 'react';
import {
  renderWithThemeProvider,
  matchSnapshotWithProvider,
} from '@/config/functions/Testing';

import {HomeFinancialProducer} from '@/presentational/FinancialScreen/HomeFinancialProducer';

describe('HomeFinancialProducer', () => {
  test('should render screen correctly', () => {
    renderWithThemeProvider(<HomeFinancialProducer />);
  });

  test('should matches snapshot', () => {
    matchSnapshotWithProvider(<HomeFinancialProducer />);
  });

  test('should render piggy bank', () => {
    const homeFinancialProducer = renderWithThemeProvider(
      <HomeFinancialProducer />,
    );

    const piggyBank = homeFinancialProducer.getByTestId('icon-piggy-bank');

    expect(piggyBank).toBeTruthy();
  });
});
