import React, {ReactNode} from 'react';
import renderer from 'react-test-renderer';
import {theme} from '@/styles';
import {Provider} from 'react-redux';
import {ThemeProvider} from 'styled-components/native';
import {render} from '@testing-library/react-native';
import {store} from '@/store';

const wraperWithProvider = (children: ReactNode) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Provider>
  );
};

export const renderWithThemeProvider = (component: ReactNode) => {
  return render(wraperWithProvider(component));
};

export const matchSnapshotWithProvider = (component: ReactNode) => {
  const tree = renderer.create(wraperWithProvider(component)).toJSON();
  expect(tree).toMatchSnapshot();
};
