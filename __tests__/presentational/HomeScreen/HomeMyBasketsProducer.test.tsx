import React from 'react';
import {
  renderWithThemeProvider,
  matchSnapshotWithProvider,
} from '@/config/functions/Testing';

import {HomeMyBasketsProducer} from '@/presentational/HomeScreen/HomeMyBasketsProducer';
import {act, fireEvent} from '@testing-library/react-native';

describe('HomeMyBasketsProducer', () => {
  test('should render screen correctly', () => {
    renderWithThemeProvider(<HomeMyBasketsProducer />);
  });

  test('should matches snapshot', () => {
    matchSnapshotWithProvider(<HomeMyBasketsProducer />);
  });

  test('should submit form', async () => {
    const {getByTestId} = renderWithThemeProvider(<HomeMyBasketsProducer />);

    const checkSmallBasket = getByTestId('checkbox-icon-not-checked-0');
    const submitButton = getByTestId('subimit-button');

    fireEvent.press(checkSmallBasket);

    await act(() => fireEvent.press(submitButton));

    expect(getByTestId('checkbox-icon-checked-0')).toBeTruthy();
  });
});
