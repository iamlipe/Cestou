import React from 'react';
import {
  renderWithThemeProvider,
  matchSnapshotWithProvider,
} from '@/config/functions/Testing';

import ButtonRedirect from '@/components/ButtonRedirect';

describe('ButtonRedirect', () => {
  const onPress = jest.fn();
  const titleText = 'press me';

  test('should render correctly', () => {
    renderWithThemeProvider(
      <ButtonRedirect title={titleText} onPress={onPress} />,
    );
  });

  test('shoudl matches snapshot', () => {
    matchSnapshotWithProvider(
      <ButtonRedirect title={titleText} onPress={onPress} />,
    );
  });

  test('should render title', () => {
    const buttonRedirect = renderWithThemeProvider(
      <ButtonRedirect title={titleText} onPress={onPress} />,
    );

    const title = buttonRedirect.getByText(titleText);

    expect(title).toBeTruthy();
  });
});
