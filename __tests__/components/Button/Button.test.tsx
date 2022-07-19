import React from 'react';
import {
  renderWithThemeProvider,
  matchSnapshotWithProvider,
} from '@/config/functions/testing';

import Button from '@/components/Button';

describe('Buttom', () => {
  test('should render correctly', () => {
    renderWithThemeProvider(<Button title="press-me" onPress={jest.fn()} />);
  });

  test('should matches snapshot', () => {
    matchSnapshotWithProvider(<Button title="press-me" onPress={jest.fn()} />);
  });

  test('should render correctly with title', () => {
    const button = renderWithThemeProvider(
      <Button title="press-me" onPress={jest.fn()} />,
    );

    const title = button.getByText('press-me');
    expect(title).toBeTruthy();
  });

  test('should render loading', () => {
    const button = renderWithThemeProvider(
      <Button title="press-me" onPress={jest.fn()} loading />,
    );

    const loading = button.getByTestId('loading');
    expect(loading).toBeTruthy();
  });
});
