import React from 'react';
import {
  renderWithThemeProvider,
  matchSnapshotWithProvider,
} from '@/config/functions/testing';
import {mockStackTabNavigatorConsumer} from '@__mocks__/mockStackTabNavigator';

import {ButtonTabConsumer} from '@/routes/BottonTab/BottonTabConsumer';
import {fireEvent} from '@testing-library/react-native';

describe('ButtonTabConsumer', () => {
  test('should render correctly', () => {
    renderWithThemeProvider(
      <ButtonTabConsumer state={mockStackTabNavigatorConsumer} />,
    );
  });

  test('should matches snapshot', () => {
    matchSnapshotWithProvider(
      <ButtonTabConsumer state={mockStackTabNavigatorConsumer} />,
    );
  });

  test('should start select tab home', () => {
    const buttonTab = renderWithThemeProvider(
      <ButtonTabConsumer state={mockStackTabNavigatorConsumer} />,
    );

    const tabIconHome = buttonTab.getByTestId('icon-tab-home');

    expect(tabIconHome.props.fill).toBe('#00A857');
  });

  test('should select tab basket', () => {
    const buttonTab = renderWithThemeProvider(
      <ButtonTabConsumer
        state={{...mockStackTabNavigatorConsumer, index: 3}}
      />,
    );

    const tabIconBasket = buttonTab.getByTestId('icon-tab-basket');

    fireEvent.press(tabIconBasket);

    const newTabIconBasket = buttonTab.getByTestId('icon-tab-basket');

    expect(newTabIconBasket.props.fill).toBe('#00A857');
  });

  test('should select tab donation', () => {
    const buttonTab = renderWithThemeProvider(
      <ButtonTabConsumer
        state={{...mockStackTabNavigatorConsumer, index: 1}}
      />,
    );

    const tabIconDonation = buttonTab.getByTestId('icon-tab-donation');

    fireEvent.press(tabIconDonation);

    const newTabIconDonation = buttonTab.getByTestId('icon-tab-donation');

    expect(newTabIconDonation.props.fill).toBe('#00A857');
  });

  test('should select tab profile', () => {
    const buttonTab = renderWithThemeProvider(
      <ButtonTabConsumer
        state={{...mockStackTabNavigatorConsumer, index: 2}}
      />,
    );

    const tabIconProfile = buttonTab.getByTestId('icon-tab-profile');

    fireEvent.press(tabIconProfile);

    const newTabIconProfile = buttonTab.getByTestId('icon-tab-profile');

    expect(newTabIconProfile.props.fill).toBe('#00A857');
  });
});
