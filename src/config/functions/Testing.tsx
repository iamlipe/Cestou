import React, {ReactNode} from 'react';
import renderer from 'react-test-renderer';
import {theme} from '@/styles';
import {Provider} from 'react-redux';
import {ThemeProvider} from 'styled-components/native';
import {render} from '@testing-library/react-native';
import {configureStore} from '@reduxjs/toolkit';
import {I18nextProvider} from 'react-i18next';
import reducers from '@/store/slices';
import i18n from '@/config/i18n';

const wraperWithProvider = (children: ReactNode, mockedStore: object) => {
  const store = configureStore({
    reducer: reducers,
    preloadedState: mockedStore,
  });

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
      </ThemeProvider>
    </Provider>
  );
};

export const renderWithThemeProvider = (
  component: ReactNode,
  mockedStore = {},
) => {
  return render(wraperWithProvider(component, mockedStore));
};

export const matchSnapshotWithProvider = (
  component: ReactNode,
  mockedStore = {},
) => {
  const tree = renderer
    .create(wraperWithProvider(component, mockedStore))
    .toJSON();
  expect(tree).toMatchSnapshot();
};
