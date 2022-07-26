import React from 'react';
import {
  renderWithThemeProvider,
  matchSnapshotWithProvider,
} from '@/config/functions/testing';

import Header from '@/components/Header';

describe('Header', () => {
  test('should render correctly', () => {
    renderWithThemeProvider(<Header />);
  });

  test('should matches snapshot', () => {
    matchSnapshotWithProvider(<Header />);
  });

  test('should render with title', () => {
    const header = renderWithThemeProvider(
      <Header title="Title" welcome={false} />,
    );

    const title = header.getByText('Title');

    expect(title).toBeTruthy();
  });

  test('should render with a welcome message', () => {
    const header = renderWithThemeProvider(<Header />, {
      user: {auth: {firstName: 'Mason'}},
    });

    const welcome = header.getByText(/olá mason!/i);

    expect(welcome).toBeTruthy();
  });
});
