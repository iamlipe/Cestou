import React from 'react';
import {
  renderWithThemeProvider,
  matchSnapshotWithProvider,
} from '@/config/functions/Testing';

import {HomeProducer} from '@/presentational/HomeScreen/HomeProducer';

describe('HomeProducer', () => {
  test('should render screen correctly', () => {
    renderWithThemeProvider(<HomeProducer />);
  });

  test('should matches snapshot', () => {
    matchSnapshotWithProvider(<HomeProducer />);
  });

  test('should have category "my baskets" and "My finances"', () => {
    const {getAllByText} = renderWithThemeProvider(<HomeProducer />);

    const titleBasket = getAllByText(/minhas cestas/i);
    const titleFinances = getAllByText(/minhas finanças/i);

    expect(titleBasket.length).toBeGreaterThanOrEqual(1);
    expect(titleFinances.length).toBeGreaterThanOrEqual(1);
  });
});
