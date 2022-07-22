import React, {ReactNode} from 'react';
import renderer from 'react-test-renderer';
import {theme} from '@/styles';
import {Provider} from 'react-redux';
import {ThemeProvider} from 'styled-components/native';
import {render} from '@testing-library/react-native';
import {configureStore} from '@reduxjs/toolkit';
import reducers from '@/store/slices';

const wraperWithProvider = (children: ReactNode, mockedStore: object) => {
  const store = configureStore({
    reducer: reducers,
    preloadedState: mockedStore,
  });

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
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
