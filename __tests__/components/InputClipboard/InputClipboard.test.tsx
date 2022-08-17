import React from 'react';
import {
  renderWithThemeProvider,
  matchSnapshotWithProvider,
} from '@/config/functions/Testing';

import InputClipBoard from '@/presentational/BasketScreen/InputClipboard';

describe('InputClipBoard', () => {
  test('should render correctly', () => {
    renderWithThemeProvider(<InputClipBoard text="test" />);
  });

  test('should matches snapshot', () => {
    matchSnapshotWithProvider(<InputClipBoard text="test" />);
  });

  test('should render with text correctly', () => {
    const inputClipboard = renderWithThemeProvider(
      <InputClipBoard text="test" />,
    );

    const text = inputClipboard.queryByText('test');

    expect(text).toBeTruthy();
  });
});
