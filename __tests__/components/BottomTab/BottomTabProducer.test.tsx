import React from 'react';
import {
  renderWithThemeProvider,
  matchSnapshotWithProvider,
} from '@/config/functions/testing';
import {mockStackTabNavigatorProducer} from '@__mocks__/mockStackTabNavigator';

import {ButtonTabProducer} from '@/routes/BottomTab/BottomTabProducer';
import {fireEvent} from '@testing-library/react-native';

describe('ButtonTabProducer', () => {
  test('should render correctly', () => {
    renderWithThemeProvider(
      <ButtonTabProducer state={mockStackTabNavigatorProducer} />,
    );
  });

  test('should matches snapshot', () => {
    matchSnapshotWithProvider(
      <ButtonTabProducer state={mockStackTabNavigatorProducer} />,
    );
  });

  test('should start select tab home', () => {
    const buttonTab = renderWithThemeProvider(
      <ButtonTabProducer state={mockStackTabNavigatorProducer} />,
    );

    const tabIconHome = buttonTab.getByTestId('icon-tab-home');

    console.log(tabIconHome.props.style[0].color);

    expect(tabIconHome.props.style[0].color).toBe('#00A857');
  });

  test('should select tab financial', () => {
    const buttonTab = renderWithThemeProvider(
      <ButtonTabProducer
        state={{...mockStackTabNavigatorProducer, index: 1}}
      />,
    );

    const tabIconFinancial = buttonTab.getByTestId('icon-tab-financial');

    fireEvent.press(tabIconFinancial);

    const newTabIconFinancial = buttonTab.getByTestId('icon-tab-financial');

    expect(newTabIconFinancial.props.style[0].color).toBe('#00A857');
  });

  test('should select tab profile', () => {
    const buttonTab = renderWithThemeProvider(
      <ButtonTabProducer
        state={{...mockStackTabNavigatorProducer, index: 2}}
      />,
    );

    const tabIconProfile = buttonTab.getByTestId('icon-tab-profile');

    fireEvent.press(tabIconProfile);

    const newTabIconProfile = buttonTab.getByTestId('icon-tab-profile');

    expect(newTabIconProfile.props.style[0].color).toBe('#00A857');
  });
});
